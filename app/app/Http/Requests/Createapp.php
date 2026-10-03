<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class Createapp extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "Photo"=>["required","file",'mimes:pdf','max:5120'],
            'id'=>['required'],
        ];
    }

    public function messages(): array
    {
        return [
            'Photo.required'=> 'input is required',
            'Photo.file'=> 'plese inter file file',
            'Photo.mimes'=> 'this is not pdf',
            'Photo.max'=>"maix value is  5120",
            'id.required'=>'id required'
        ];
    }

}
