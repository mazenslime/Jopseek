<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class JopvacancyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'Title' => ['required', 'string', 'max:255'],
            'Description' => ['required', 'string', 'max:5000'],
            'Location' => ['required', 'string', 'max:255'],
            'Type' => ['required'],
            'Salary' => ['required','numeric','min:0','max:999999'],
            'Requiredskills' => ['required', 'string', 'max:5000'],
            'Companyid' => ['required'],
            'Categouryid' => ['required'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'=> 'The company name is required.',
            'title.string' => 'The company name must be a valid string.',
            'title.max' => 'The company name may not exceed 255 characters.',
            'Location.required' => 'The address is required.',
            'Location.string' => 'The address must be a valid string.',
            'Location.max' => 'The address may not exceed 255 characters.',
            'Description.required' => 'The industry is required.',
            'Description.string' => 'The industry must be a valid string.',
            'Description.max' => 'The industry may not exceed 255 characters.',
            'Requiredskills.string' => 'The owner name must be a valid string.',
            'Requiredskills.max' => 'The owner name may not exceed 255 characters.',
            'Requiredskills.required' => 'The owner email is required.',
            'Salary.numeric' => 'The owner name must be a valid string.',
            'Salary.max' => 'The owner name may not exceed 255 characters.',
            'Salary.min' => 'The owner name may not exceed 1 characters.',
            'Salary.required' => 'The owner email is required.',
            'Companyid.required' => 'The owner name may not exceed 255 characters.',
            'Companyid.uuid' => 'The owner name may not exceed 1 characters.',
            'Companyid.exists' => 'The owner email is required.',
            'Categouryid.required' => 'The owner name may not exceed 255 characters.',
            
        ];

    }
}