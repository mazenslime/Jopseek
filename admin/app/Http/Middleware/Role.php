<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Role
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next,...$Role): Response
    {
        if (Auth::check()){
            if(!in_array(Auth::user()->Role, $Role)){
                abort(403);
            }
                  
            return $next($request);
        };    
        abort(403);
    }

}