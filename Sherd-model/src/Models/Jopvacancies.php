<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Jopvacancies extends Model
{
    //
    use HasUuids, SoftDeletes;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = "vacances";
    protected $fillable = [
        "Title",
        "Description",
        "Location",
        "Type",
        "Salary",
        "Requiredskills",
        "Viewcount",
        "Companyid",
        "Categouryid",
    ];
    protected $guarded = [
        "id",
    ];
    public $timestamps = true;
    protected function casts()
    {
        return [
            "Deleted_at"=> "datetime",
        ];
    }

    public function Company(){
        return $this->belongsTo(Companies::class, 'Companyid');
    }

    public function Categoury(){
        return $this->belongsTo(JopCategoury::class, 'Categouryid');
    }

    public function Applications(){
        return $this->hasMany(Jopapplication::class);
    }
}
