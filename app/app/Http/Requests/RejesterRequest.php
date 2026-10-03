<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RejesterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    // public function authorize(): bool
    // {
    //     return false;
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name"=>["required","string"],
            "email"=>['bail',"required","string","unique:Users,email,{{$this->input('id')}},id"],
            "password"=>["required","required","string","min:8","max:60"],
        ];

    }
    public function messages(): array { return [ "Name.required" => "Name is required.", "Name.string" => "Name must be a valid text.", "Email.required" => "Email is required.", "Email.email" => "Please enter a valid email address.", "Email.unique" => "This email is already registered.", "Password.required" => "Password is required.", "Password.string" => "Password must be a valid string.", "Password.min" => "Password must be at least 8 characters.", "Password.max" => "Password cannot be more than 60 characters.", "Password.confirmed" => "Password confirmation does not match.", ]; }
}
