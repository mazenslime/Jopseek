<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Models\Companies;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(Auth::user()->Role=="admin"){
            if(request()->has("Archive")){
                $companies =Companies::onlyTrashed()->paginate(5);
            }else{
                $companies = Companies::paginate(5);
            }
            return Inertia::render("Companies/Index", ['companies'=>$companies]);
        }else{
            $user=User::findOrFail(Auth::user()->id);
            $company = Companies::findOrFail(Auth::user()->company->id);
            return Inertia::render('Companies/Show', ['company'=>$company,'user'=>$user]);
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(CompanyRequest $request)
    {
        $data = $request->validated();

        $owner = User::create([
            'name' => $data['owner_name'],
            'email' => $data['owner_email'],
            'Role'=>'owner',
            'password' => bcrypt($data['owner_password']),
        ]);

        Companies::create([
            'Name' => $data['Name'],
            'Adderses' => $data['Adderses'],
            'Indastry' => $data['Indastry'],
            'Website' => $data['Website'] ?? null,
            'Ownerid' => $owner->id,
        ]);
        return to_route('companies.index')->with('success', 'Company and owner created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
       $company = Companies::findOrFail($id);
       Gate::authorize('show',$company);  
       $company=Companies::findOrFail($id);
       $user=User::where('id', $company->Ownerid)->first();
       return Inertia::render('Companies/Show', ['company'=>$company,'user'=>$user]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(CompanyRequest $request, Companies $company)
    {
        $data = $request->validated();

        $company->update([
            'Name' => $data['Name'],
            'Adderses' => $data['Adderses'],
            'Indastry' => $data['Indastry'],
            'Website' => $data['Website'] ?? null,
        ]);

        return to_route('companies.index')->with('success', 'Company updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Companies::destroy($id);
        to_route('companies.index')->with('success','deleted sucsses');
    }

    public function Restor($id)
    {
        $companies=Companies::onlyTrashed()->findOrFail($id);
        $companies->restore();
        to_route('companies.index')->with('success','restore sucsses');
    }

    public function delete($id){
        $company=Companies::findOrFail($id);
        $company->delete($id);
        to_route('companies.index')->with('success','delete  sucsses');
    }
}
