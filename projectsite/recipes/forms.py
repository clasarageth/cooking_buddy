from django.forms import ModelForm
from .models import Recipe


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