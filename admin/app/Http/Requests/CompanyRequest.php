<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'Name' => ['required', 'string', 'max:255'],
            'Adderses' => ['required', 'string', 'max:255'],
            'Indastry' => ['required', 'string', 'max:255'],
            'Website' => ['nullable', 'url', 'max:255'],
        ];

        if ($this->isMethod('post')) {
            $rules['owner_name'] = ['required', 'string', 'max:255'];
            $rules['owner_email'] = ['required', 'email', 'max:255', 'unique:users,email'];
            $rules['owner_password'] = ['required', 'string', 'min:8'];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'Name.required' => 'The company name is required.',
            'Name.string' => 'The company name must be a valid string.',
            'Name.max' => 'The company name may not exceed 255 characters.',
            'Adderses.required' => 'The address is required.',
            'Adderses.string' => 'The address must be a valid string.',
            'Adderses.max' => 'The address may not exceed 255 characters.',
            'Indastry.required' => 'The industry is required.',
            'Indastry.string' => 'The industry must be a valid string.',
            'Indastry.max' => 'The industry may not exceed 255 characters.',
            'Website.url' => 'Please provide a valid website URL.',
            'owner_name.required' => 'The owner name is required.',
            'owner_name.string' => 'The owner name must be a valid string.',
            'owner_name.max' => 'The owner name may not exceed 255 characters.',
            'owner_email.required' => 'The owner email is required.',
            'owner_email.email' => 'Please enter a valid owner email address.',
            'owner_email.unique' => 'This owner email is already in use.',
            'owner_password.required' => 'The owner password is required.',
            'owner_password.min' => 'The owner password must be at least 8 characters.',
        ];
    }
}
