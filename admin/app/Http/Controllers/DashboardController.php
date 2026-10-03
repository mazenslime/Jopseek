<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $applications = DB::table('jopapplication')->whereNull('Deleted_at');

        return Inertia::render('dashboard', [
            'stats' => [
                'applicants' => DB::table('users')
                    ->where('Role', 'jopseeker')
                    ->whereNull('Deleted_at')
                    ->count(),
                'companies' => DB::table('company')
                    ->whereNull('Deleted_at')
                    ->count(),
                'vacancies' => DB::table('vacances')
                    ->whereNull('Deleted_at')
                    ->count(),
                'applications' => (clone $applications)->count(),
                'pendingApplications' => (clone $applications)
                    ->where('Status', 'pendding')
                    ->count(),
                'acceptedApplications' => (clone $applications)
                    ->where('Status', 'accepted')
                    ->count(),
                'rejectedApplications' => (clone $applications)
                    ->where('Status', 'rejected')
                    ->count(),
            ],
            'recentApplications' => DB::table('jopapplication as applications')
                ->leftJoin('users', 'users.id', '=', 'applications.Userid')
                ->leftJoin('vacances', 'vacances.id', '=', 'applications.Jobid')
                ->leftJoin('company', 'company.id', '=', 'vacances.Companyid')
                ->whereNull('applications.Deleted_at')
                ->select([
                    'applications.id',
                    'users.name as applicant_name',
                    'vacances.Title as job_title',
                    'company.name as company_name',
                    'applications.Status as status',
                    'applications.created_at',
                ])
                ->latest('applications.created_at')
                ->limit(5)
                ->get(),
            'recentVacancies' => DB::table('vacances')
                ->leftJoin('company', 'company.id', '=', 'vacances.Companyid')
                ->whereNull('vacances.Deleted_at')
                ->select([
                    'vacances.id',
                    'vacances.Title as title',
                    'company.name as company_name',
                    'vacances.Location as location',
                    'vacances.created_at',
                ])
                ->latest('vacances.created_at')
                ->limit(5)
                ->get(),
        ]);
    }
}
