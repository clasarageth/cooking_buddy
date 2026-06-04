from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q, Avg
from .models import Recipe, Review
from django.contrib.auth.decorators import login_required
from .forms import ReviewForm

@login_required
def home(request):

    query = request.GET.get('q')

    recipes = Recipe.objects.all().annotate(
        average_rating=Avg('reviews__rating')
    )

    if query:
        recipes = Recipe.objects.filter(
            Q(title__icontains=query) |
            Q(ingredients__icontains=query)
        ).annotate(
            average_rating=Avg('reviews__rating')
        )

    top_recipes = (
        Recipe.objects.annotate(
            average_rating=Avg('reviews__rating')
        )
        .order_by('-average_rating')[:3]
    )

    context = {
        'recipes': recipes,
        'top_recipes': top_recipes,
    }

    return render(request, 'recipes/home.html', context)

from django.shortcuts import render, redirect
from .forms import RecipeForm

@login_required
def create_recipe(request):

    form = RecipeForm()

    if request.method == 'POST':

        form = RecipeForm(
            request.POST,
            request.FILES
        )

        if form.is_valid():

            recipe = form.save(commit=False)

            recipe.author = request.user

            recipe.save()

            return redirect('home')

    context = {
        'form': form
    }

    return render(
        request,
        'recipes/create_recipe.html',
        context
    )

def recipe_detail(request, pk):

    recipe =get_object_or_404(Recipe, id=pk)

    average_rating = recipe.reviews.aggregate(
        Avg('rating')
    )['rating__avg']

    context = {
        'recipe': recipe,
        'average_rating': average_rating
    }

    return render(
        request,
        'recipes/recipe_detail.html',
        context
    )

@login_required
def update_recipe(request, pk):

    recipe =get_object_or_404(Recipe, id=pk)

    # Only the uploader can edit
    if recipe.author != request.user:
        return redirect('home')

    form = RecipeForm(instance=recipe)

    if request.method == 'POST':

        form = RecipeForm(
            request.POST,
            request.FILES,
            instance=recipe
        )

        if form.is_valid():
            form.save()

            return redirect('recipe_detail', pk=recipe.id)

    context = {
        'form': form
    }

    return render(
        request,
        'recipes/update_recipe.html',
        context
    )

@login_required
def delete_recipe(request, pk):

    recipe =get_object_or_404(Recipe, id=pk)

    # Only the uploader can delete
    if recipe.author != request.user:
        return redirect('home')

    if request.method == 'POST':

        recipe.delete()

        return redirect('home')

    return render(
        request,
        'recipes/delete_recipe.html',
        {'recipe': recipe}
    )

@login_required
def add_review(request, pk):

    recipe = get_object_or_404(Recipe, id=pk)

    # Cannot rate own recipe
    if recipe.author == request.user:
        return redirect('recipe_detail', pk=pk)

    # Already rated
    existing_review = Review.objects.filter(
        recipe=recipe,
        user=request.user
    ).first()

    if existing_review:
        return redirect('recipe_detail', pk=pk)

    if request.method == 'POST':

        form = ReviewForm(request.POST)

        if form.is_valid():

            review = form.save(commit=False)

            review.recipe = recipe
            review.user = request.user

            review.save()

            return redirect('recipe_detail', pk=pk)

    else:
        form = ReviewForm()

    return render(
        request,
        'recipes/add_review.html',
        {'form': form, 'recipe': recipe}
    )