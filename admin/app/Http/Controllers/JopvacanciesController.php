<?php

namespace App\Http\Controllers;

use App\Http\Requests\JopvacancyRequest;
use App\Models\Companies;
use App\Models\JopCategoury;
use App\Models\Jopvacancies;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;;

class JopvacanciesController extends Controller
{
    public function index()
    {
        if(Auth::user()->Role=="admin"){
            $vacancies = Jopvacancies::with(['Company', 'Categoury'])
            ->when(request()->has('Archive'), fn ($query) => $query->onlyTrashed())
            ->latest()
            ->paginate(10)
            ->withQueryString();
        }else{
            $vacancies = Jopvacancies::with(['Company', 'Categoury'])
            ->when(request()->has('Archive'), fn ($query) => $query->onlyTrashed())
            ->where('Companyid','=',Auth::user()->company->id)
            ->latest()
            ->paginate(10)
           ->withQueryString();
        }
        return Inertia::render('Jopvacancies/Index', [
            'vacancies' => $vacancies,
            'companies' => Companies::query()->orderBy('name')->get(['id', 'name']),
            'categories' => JopCategoury::query()->orderBy('Name')->get(['id', 'Name']),
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Jopvacancies/Create', [
            'companies' => Companies::query()->orderBy('name')->get(['id', 'name']),
            'categories' => JopCategoury::query()->orderBy('Name')->get(['id', 'Name']),
        ]);
    }

    public function store(JopvacancyRequest $request)
    {
        Jopvacancies::create($request->validated());
        return to_route('Jopvacancies.index')->with('success', 'Job vacancy created successfully.');
    }

    public function show(Jopvacancies $Jopvacancy)
    {
        $Jopvacancy->load(['Company','Categoury']);
        $companies = Companies::query()->orderBy('id')->get(['id', 'name']);
        $categories = JopCategoury::query()->orderBy('id')->get(['id', 'Name']);
        return Inertia::render('Jopvacancies/Show', ['vacancy' => $Jopvacancy,$companies,$categories]);
    }

    public function edit(Jopvacancies $Jopvacancy)
    {
        return Inertia::render('Jopvacancies/Edit', [
            'vacancy' => $Jopvacancy,
            'companies' => Companies::query()->orderBy('name')->get(['id', 'name']),
            'categories' => JopCategoury::query()->orderBy('Name')->get(['id', 'Name']),
        ]);
    }

    public function update(JopvacancyRequest $request, Jopvacancies $Jopvacancy)
    {
        $Jopvacancy->update($request->validated());
        return to_route('Jopvacancies.index')->with('success', 'Job vacancy updated successfully.');
    }

    public function destroy(Jopvacancies $Jopvacancy)
    {
        $Jopvacancy->delete();
        return to_route('Jopvacancies.index')->with('success', 'Job vacancy archived successfully.');
    }
}
