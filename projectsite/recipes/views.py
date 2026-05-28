from django.shortcuts import render
from django.db.models import Q
from .models import Recipe


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