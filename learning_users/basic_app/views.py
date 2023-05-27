from django.shortcuts import redirect, render
from django.urls import reverse
from basic_app.forms import UserForm, UserProfileInfoForm
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.views.decorators.csrf import csrf_protect
from .models import User, UserProfileInfo


def index(request):
    return render(request, 'basic_app/index.html')


@login_required
def special(request):
    return HttpResponse("You are logged in. Nice!")


@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))


def register(request):
    registered = False

    if request.method == 'POST':
        user_form = UserForm(request.POST)
        profile_form = UserProfileInfoForm(request.POST)

        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save(commit=False)
            user.set_password(user.password)
            user.save()

            profile = profile_form.save(commit=False)
            profile.user = user

            if 'profile_pic' in request.FILES:
                profile.profile_pic = request.FILES['profile_pic']

            profile.save()

            registered = True
            messages.success(request, 'Registration successful. Please log in.')
            return redirect('basic_app:user_login')
        else:
            messages.error(request, 'Registration failed. Please correct the errors.')
            print(user_form.errors, profile_form.errors)
    else:
        user_form = UserForm()
        profile_form = UserProfileInfoForm()

    return render(request, 'basic_app/registration.html', {
        'user_form': user_form,
        'profile_form': profile_form,
        'registered': registered
    })


@csrf_protect
def user_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, email=email, password=password)

        if user:
            #Check it the account is active
            if user.is_active:
                # Log the user in.
                login(request,user)
                # Send the user back to some page.
                # In this case their homepage.
                return render(request, 'basic_app/login.html', {})
            else:
                # If account is not active:
                return HttpResponse("Your account is not active.")
        else:
            print("Someone tried to login and failed.")
            print("They used email: {} and password: {}".format(email,password))
            return HttpResponse("Invalid login details supplied."+email+" "+password)

    else:
        #Nothing has been provided for username or password.
        return render(request, 'basic_app/login.html', {})


@login_required
def dashboard(request):
    try:
        profile = UserProfileInfo.objects.get(user_id=request.user)
        coin_balance = profile.coin_balance
        point_balance = profile.point_balance
    except UserProfileInfo.DoesNotExist:
        coin_balance = 0.0
        point_balance = 0.0

    context = {
        'coin_balance': coin_balance,
        'point_balance': point_balance
    }

    return render(request, 'basic_app/dashboard.html', context)

@login_required
def user_list(request):
    users = UserProfileInfo.objects.all()
    context = {
        'users': users
    }
    return render(request, 'basic_app/user_list.html', context)