<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAPPRequest;
use App\Http\Requests\RejesterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RejesterController extends Controller
{
    public function index()
    {
        Inertia::render("auth/Rejester");
    }

    public function Rejester(RejesterRequest $request){
        $user=User::create($request->all());
        Auth::login($user);
        return Inertia::render("auth/login",compact("user"));
    }
}
