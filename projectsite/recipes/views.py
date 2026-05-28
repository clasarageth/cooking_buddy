from django.shortcuts import render
from .models import Recipe


def home(request):
    recipes = Recipe.objects.all()

    context = {
        'recipes': recipes
    }

    return render(request, 'recipes/home.html', context)