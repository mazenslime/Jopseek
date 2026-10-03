<?php

namespace Database\Seeders;

use App\Models\Jopvacancies;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CompanyVacancySeeder extends Seeder
{
    public function run(): void
    {
        $companyData = [
            'Northstar Digital' => [
                'address' => '120 Market Street, San Francisco, CA',
                'industry' => 'Technology',
                'website' => 'https://northstar.example',
                'owner_name' => 'Jordan Lee',
                'owner_email' => 'jordan.lee@northstar.example',
            ],
            'Pinecrest Health' => [
                'address' => '48 Lake Avenue, Chicago, IL',
                'industry' => 'Healthcare',
                'website' => 'https://pinecrest.example',
                'owner_name' => 'Morgan Patel',
                'owner_email' => 'morgan.patel@pinecrest.example',
            ],
            'Harborline Finance' => [
                'address' => '900 Pearl Street, Boston, MA',
                'industry' => 'Financial Services',
                'website' => 'https://harborline.example',
                'owner_name' => 'Casey Rivera',
                'owner_email' => 'casey.rivera@harborline.example',
            ],
        ];

        $companyIds = [];

        foreach ($companyData as $companyName => $company) {
            $owner = User::query()->firstOrCreate(
                ['email' => $company['owner_email']],
                [
                    'name' => $company['owner_name'],
                    'Role' => 'owner',
                    'password' => Str::random(48),
                ],
            );

            if ($owner->Role !== 'owner') {
                $owner->forceFill(['Role' => 'owner'])->save();
            }

            $companyId = DB::table('company')
                ->where('name', $companyName)
                ->value('id') ?? (string) Str::uuid();

            DB::table('company')->updateOrInsert(
                ['name' => $companyName],
                [
                    'id' => $companyId,
                    'Adderses' => $company['address'],
                    'Indastry' => $company['industry'],
                    'Website' => $company['website'],
                    'Ownerid' => $owner->id,
                    'Deleted_at' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            );

            $companyIds[$companyName] = $companyId;
        }

        $categoryIds = [];

        foreach (['Engineering', 'Design', 'Healthcare', 'Finance'] as $categoryName) {
            $categoryId = DB::table('jopcategoury')
                ->where('Name', $categoryName)
                ->value('id') ?? (string) Str::uuid();

            DB::table('jopcategoury')->updateOrInsert(
                ['Name' => $categoryName],
                [
                    'id' => $categoryId,
                    'Deleted_at' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            );

            $categoryIds[$categoryName] = $categoryId;
        }

        $vacancies = [
            [
                'company' => 'Northstar Digital',
                'title' => 'Senior Backend Engineer',
                'description' => 'Build and maintain reliable services for our growing product platform.',
                'location' => 'San Francisco, CA',
                'type' => 'Full-time',
                'salary' => 145000,
                'skills' => 'PHP, Laravel, PostgreSQL, REST APIs',
                'category' => 'Engineering',
            ],
            [
                'company' => 'Northstar Digital',
                'title' => 'Product Designer',
                'description' => 'Design accessible workflows in close partnership with product and engineering.',
                'location' => 'Remote',
                'type' => 'Remote',
                'salary' => 112000,
                'skills' => 'Figma, prototyping, accessibility, user research',
                'category' => 'Design',
            ],
            [
                'company' => 'Pinecrest Health',
                'title' => 'Clinical Data Analyst',
                'description' => 'Turn clinical and operational data into clear reporting for care teams.',
                'location' => 'Chicago, IL',
                'type' => 'Full-time',
                'salary' => 92000,
                'skills' => 'SQL, healthcare data, dashboards, data quality',
                'category' => 'Healthcare',
            ],
            [
                'company' => 'Pinecrest Health',
                'title' => 'Healthcare Software Engineer',
                'description' => 'Develop secure applications that support patient and provider experiences.',
                'location' => 'Chicago, IL',
                'type' => 'Hybrid',
                'salary' => 128000,
                'skills' => 'PHP, APIs, security, relational databases',
                'category' => 'Engineering',
            ],
            [
                'company' => 'Harborline Finance',
                'title' => 'Financial Analyst',
                'description' => 'Prepare forecasts and financial analysis for business planning.',
                'location' => 'Boston, MA',
                'type' => 'Full-time',
                'salary' => 98000,
                'skills' => 'Financial modeling, Excel, forecasting, reporting',
                'category' => 'Finance',
            ],
            [
                'company' => 'Harborline Finance',
                'title' => 'Risk Data Engineer',
                'description' => 'Build data pipelines and tools used by our risk analysis teams.',
                'location' => 'Remote',
                'type' => 'Contract',
                'salary' => 135000,
                'skills' => 'Python, SQL, ETL, data modeling',
                'category' => 'Engineering',
            ],
        ];

        foreach ($vacancies as $vacancy) {
            Jopvacancies::query()->updateOrCreate(
                [
                    'Title' => $vacancy['title'],
                    'Companyid' => $companyIds[$vacancy['company']],
                ],
                [
                    'Description' => $vacancy['description'],
                    'Location' => $vacancy['location'],
                    'Type' => $vacancy['type'],
                    'Salary' => $vacancy['salary'],
                    'Requiredskills' => $vacancy['skills'],
                    'Viewcount' => 0,
                    'Categouryid' => $categoryIds[$vacancy['category']],
                ],
            );
        }
    }
}