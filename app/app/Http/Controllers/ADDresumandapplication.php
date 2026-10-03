<?php

namespace App\Http\Controllers;

use App\Http\Requests\Createapp;
use App\Http\Requests\CreateAPPRequest;
use App\Models\Jopapplication;
use App\Models\Resumes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use PHPUnit\TextUI\Application;

class ADDresumandapplication extends Controller
{
    public function index(){
        $MYAPPlica = Jopapplication::with(['vacans'])
        ->where("Userid",Auth::user()->id)->get();
        return Inertia::render("Myapplications/Myapp",['applications'=>$MYAPPlica]);
    }



    public function store(Request $request, $id){

        if(Jopapplication::where("Userid",Auth::user()->id)->where("Jobid",$id)->exists()){
            return redirect()->route('Myapp')->with("error","you have already applied for this job");
        }
        $photo=$request->file('Photo');
        $filename = $photo->getClientOriginalName();
        $extension = $photo->getClientOriginalExtension();
        $new_filename = $filename .time() . $extension;
        // Store in desk
        $path=$photo->storeAs('resumes', $new_filename, 'public');
        $fillurl=config('filesystems.disks.local.root').$path;
        // store resum file in database
        $resum=Resumes::create([
            "Fillname"=>$new_filename,
            'Fileuri'=>$fillurl,
            'Userid'=>Auth::user()->id,
            "ContactDetiles"=>"",
            "Summary"=>"",
            "Skills"=>"",
            "Expirince"=>"",
            "Education"=>"",
            
        ]);
        // store APPlication

        Jopapplication::create([
           "Status"=>'pendding',
            "Aigenratedscore"=>0,
            "Aigenratedfeedback"=>"",
            "Jobid"=>$id,
            "ResumId"=>$resum->id,
            "Userid"=>Auth::user()->id,
        ]);
           
     return redirect()->route('Myapp')->with("success","ssuccess add aplication ");

    }


    public function show($id){
    //     $Jopapplication = Jopapplication::find($id);
    // return Inertia::render('',[''=>$Jopapplication]);
    }

    public function destroy($id){
        $APPlication= Jopapplication::findOrFail($id);
        $APPlication->delete();
        return redirect('Myapp')->with('success','success delete application');
    }
}
