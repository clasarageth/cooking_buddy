from django.forms import ModelForm
from .models import Recipe, Review
from django import forms


class RecipeForm(ModelForm):

    class Meta:
        model = Recipe

        fields = [
            'title',
            'description',
            'ingredients',
            'instructions',
            'image',
            'cooking_time',
            'servings',
            'category'
        ]

class ReviewForm(ModelForm):
    rating = forms.ChoiceField(
        choices=[
            (1, '⭐'),
            (2, '⭐⭐'),
            (3, '⭐⭐⭐'),
            (4, '⭐⭐⭐⭐'),
            (5, '⭐⭐⭐⭐⭐'),
        ]
    )

    class Meta:
        model = Review

        
        fields = ['rating', 'comment']