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

        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'id': 'recipe-title',
                'placeholder': 'e.g.Adobo'
            }),

            'description': forms.Textarea(attrs={
                'class': 'form-control',
                'id': 'recipe-desc',
                'rows': 3,
                'placeholder': 'A short, enticing description of your recipe…'
            }),

            'category': forms.Select(attrs={
                'class': 'form-control',
                'id': 'recipe-category'
            }),

            'cooking_time': forms.NumberInput(attrs={
                'class': 'form-control',
                'id': 'cooking-time',
                'placeholder': '30',
                'min': 1,
                'max': 1440
            }),

            'servings': forms.NumberInput(attrs={
                'class': 'form-control',
                'id': 'servings',
                'placeholder': '4',
                'min': 1,
                'max': 100
            }),
            'image': forms.ClearableFileInput(attrs={
                'class': 'form-control',
                'id': 'recipe-image',
                'accept': 'image/*'
            }),
        }

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