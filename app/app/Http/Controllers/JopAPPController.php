<?php

namespace App\Http\Controllers;

use App\Models\Jopvacancies;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JopAPPController extends Controller
{
    public function index(){
        if(Request()->has("query") || Request()->has("Fillter")){
            $query=$query =Request()->query('query');
            $Fillter=Request()->query('Fillter');
           $vacancies = Jopvacancies::where('Title','like','%' . $query . '%')
           ->where('Type','=',$Fillter)->with(['Company', 'Categoury'])
            ->when(request()->has('Archive'), fn ($query) => $query->onlyTrashed())
            ->latest()
            ->paginate(10)
            ->withQueryString();
            return Inertia::render("Joppage/Joppage",
            ["vacancies"=>$vacancies]);
        }
        $vacancies = Jopvacancies::with(['Company', 'Categoury'])
            ->when(request()->has('Archive'), fn ($query) => $query->onlyTrashed())
            ->latest()
            ->paginate(10)
            ->withQueryString();
        return Inertia::render("Joppage/Joppage",
        ["vacancies"=>$vacancies]);
    }

    public function show($id){
        $vacances=Jopvacancies::with(['Company','Categoury'])
        ->where('id',$id)
        ->get();
        return Inertia::render('Joppage/Show',['vacances'=>$vacances]);
    }


}
