from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from .forms import RegisterForm
from django.contrib.auth import logout


def register_view(request):

    form = RegisterForm()

    if request.method == 'POST':

        form = RegisterForm(request.POST)

        if form.is_valid():

            form.save()

            return redirect('login')

    context = {
        'form': form
    }

    return render(
        request,
        'accounts/register.html',
        context
    )

def logout_view(request):
    logout(request)
    return redirect('login')