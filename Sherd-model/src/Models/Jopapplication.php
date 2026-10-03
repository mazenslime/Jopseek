<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Jopapplication extends Model
{
    use HasUuids, SoftDeletes;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = "JopApplication";
    protected $fillable = [
        "Status",
        "Aigenratedscore",
        "Aigenratedfeedback",
        "Jobid",
        "ResumId",
        "Userid",
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

    public function Users(){
        return $this->hasOne(User::class);
    }

    public function vacans(){
        return $this->belongsTo(Jopvacancies::class,'Jobid','id');
    }

    public function Resum(){
        return $this->belongsTo(Resumes::class);
    } 
}
