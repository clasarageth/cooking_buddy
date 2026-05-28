from django.shortcuts import render
from django.db.models import Q
from .models import Recipe
from django.contrib.auth.decorators import login_required


def home(request):

    query = request.GET.get('q')

    recipes = Recipe.objects.all()

    if query:
        recipes = Recipe.objects.filter(
            Q(title__icontains=query) |
            Q(ingredients__icontains=query)
        )

    context = {
        'recipes': recipes
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

    recipe = Recipe.objects.get(id=pk)

    context = {
        'recipe': recipe
    }

    return render(
        request,
        'recipes/recipe_detail.html',
        context
    )

@login_required
def update_recipe(request, pk):

    recipe = Recipe.objects.get(id=pk)

    form = RecipeForm(instance=recipe)

    if request.method == 'POST':

        form = RecipeForm(
            request.POST,
            request.FILES,
            instance=recipe
        )

        if form.is_valid():
            form.save()

            return redirect('home')

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

    recipe = Recipe.objects.get(id=pk)

    if request.method == 'POST':
        recipe.delete()

        return redirect('home')

    return render(
        request,
        'recipes/delete_recipe.html',
        {'recipe': recipe}
    )