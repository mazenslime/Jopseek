<?php

namespace App\Http\Controllers;

use App\Models\Jopapplication;
use App\Models\Resumes;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator as ValidatorInstance;
use Inertia\Inertia;

class ADDresumandapplication extends Controller
{
    public function index()
    {
        $MYAPPlica = Jopapplication::with(['vacans'])
            ->where('Userid', Auth::user()->id)->get();

        return Inertia::render('Myapplications/Myapp', ['applications' => $MYAPPlica]);
    }

    public function store(Request $request, string $id): RedirectResponse
    {
        if (Jopapplication::where('Userid', Auth::user()->id)->where('Jobid', $id)->exists()) {
            return redirect()->route('Myapp')->with('error', 'you have already applied for this job');
        }

        $userId = Auth::id();
        $validator = Validator::make($request->all(), [
            'ResumeIds' => ['sometimes', 'array', 'max:5'],
            'ResumeIds.*' => [
                'required',
                'uuid',
                'distinct',
                Rule::exists('resume_tablel', 'id')->where('Userid', $userId),
            ],
            'ResumeFiles' => ['sometimes', 'array', 'max:5'],
            'ResumeFiles.*' => ['required', 'file', 'mimes:pdf', 'max:5120'],
        ]);
        $validator->after(function (ValidatorInstance $validator) use ($request): void {
            $resumeIds = $request->input('ResumeIds', []);
            $resumeFiles = $request->file('ResumeFiles', []);
            $resumeCount = count(is_array($resumeIds) ? $resumeIds : [])
                + count(is_array($resumeFiles) ? $resumeFiles : []);

            if ($resumeCount === 0) {
                $validator->errors()->add('ResumeIds', 'Select or upload at least one resume.');
            } elseif ($resumeCount > 5) {
                $validator->errors()->add('ResumeIds', 'You can attach up to five resumes.');
            }
        });
        $validated = $validator->validate();
        $resumeIds = $validated['ResumeIds'] ?? [];
        $resumeFiles = $request->file('ResumeFiles', []);

        DB::transaction(function () use ($id, $resumeFiles, $resumeIds, $userId): void {
            foreach ($resumeFiles as $resumeFile) {
                $path = $resumeFile->store('resumes', 'public');

                if ($path === false) {
                    throw new \RuntimeException('Unable to store the uploaded resume.');
                }

                $resume = Resumes::create([
                    'Fillname' => $resumeFile->getClientOriginalName(),
                    'Fileuri' => Storage::disk('public')->path($path),
                    'Userid' => $userId,
                    'ContactDetiles' => '',
                    'Summary' => '',
                    'Skills' => '',
                    'Expirince' => '',
                    'Education' => '',
                ]);
                $resumeIds[] = $resume->id;
            }

            $application = Jopapplication::create([
                'Status' => 'pendding',
                'Aigenratedscore' => 0,
                'Aigenratedfeedback' => '',
                'Jobid' => $id,
                'ResumId' => $resumeIds[0],
                'Userid' => $userId,
            ]);

            $application->Resums()->sync($resumeIds);
        });

        return redirect()->route('Myapp')->with('success', 'Successfully submitted your application.');
    }

    public function show($id)
    {
        return abort(404);
    }

    public function destroy($id)
    {
        $APPlication = Jopapplication::findOrFail($id);
        $APPlication->delete();

        return redirect('Myapp')->with('success', 'success delete application');
    }
}
