<?php

namespace App\Http\Controllers;

use App\Models\Jopapplication;
use App\Models\Resumes;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use PHPUnit\TextUI\Application;

class JopappController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(Auth::user()->Role=="admin"){
            if(Request()->has("Archive")){
                $jopapplications = Jopapplication::onlyTrashed()->paginate(5);            
            }else{
                $jopapplications = Jopapplication::paginate(5);            
            }
        }else{
            $jopapplications = Jopapplication::whereHas('vacans', function ($query) {
                $query->where('Companyid',Auth::user()->company->id);
            })->paginate(5);
        }
        $jopapplications->load(['vacans:id,Title,Companyid', 'vacans.Company:id,Name']);

        $applicants = User::query()
            ->whereIn('id', $jopapplications->getCollection()->pluck('Userid'))
            ->get(['id', 'name', 'email'])
            ->keyBy('id');
        $jopapplications->getCollection()->each(function (Jopapplication $application) use ($applicants, $jopapplications) {
            $vacancy = $application->vacans;
            $application->setAttribute('job_title', $vacancy?->Title);
            $application->setAttribute('company_name', $vacancy?->Company?->Name);
            $application->unsetRelation('vacans');
            $application->setRelation('applicant', $applicants->get($application->Userid));
            $application->setAttribute('Resume', $application->Resums()->first());
        });

        return Inertia::render("Jopapplication/Index", ['Application'=>$jopapplications]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Jopapplication $jopapplication)
    {
        return abort(404, 'Not Found');
        // $applicant = User::query()->find($jopapplication->Userid, ['id', 'name', 'email']);
        // $resume = DB::table('resume_tablel')->where('id', $jopapplication->ResumId)->first();

        // if (! $resume && $jopapplication->Userid) {
        //     $resume = DB::table('resume_tablel')->where('Userid', $jopapplication->Userid)->first();
        // }

        // return Inertia::render('Jopapplication/Show', [
        //     'Appplication' => [
        //         'id' => $jopapplication->id,
        //         'Status' => $jopapplication->Status,
        //         'Aigenratedscore' => $jopapplication->Aigenratedscore,
        //         'Aigenratedfeedback' => $jopapplication->Aigenratedfeedback,
        //         'Jobid' => $jopapplication->Jobid,
        //         'ResumId' => $jopapplication->ResumId,
        //         'Userid' => $jopapplication->Userid,
        //         'Deleted_at' => $jopapplication->Deleted_at,
        //         'created_at' => $jopapplication->created_at,
        //         'updated_at' => $jopapplication->updated_at,
        //         'resume' => $resume,
        //         'applicant' => $applicant ? [
        //             'id' => $applicant->id,
        //             'name' => $applicant->name,
        //             'email' => $applicant->email,
        //         ] : null,
        //     ],
        // ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jopapplication $jopapplication)
    {
       $jopapplication->only(['Status']);
        return Inertia::render('Jopapplication/Edit', [
            'jopapplication' => $jopapplication,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
   
        $validated = $request->validate([
            'Status' => 'required|in:pendding,accepted,rejected',
        ]);
        Jopapplication::where('id',$id)->update(['Status' => $validated['Status']]);

        return to_route('Jopapplication.index')->with('success', 'Application status updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
       Jopapplication::destroy($id);
        return to_route('Jopapplication.index')->with('success', 'Application archived successfully.');
    }
}
