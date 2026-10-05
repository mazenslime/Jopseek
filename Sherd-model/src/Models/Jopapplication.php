<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Jopapplication extends Model
{
    use HasUuids, SoftDeletes;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'jopapplication';
    public const DELETED_AT = 'Deleted_at';
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



    public function Resums(): HasOne
    {
        return $this->hasOne(Resumes::class, 'id', 'ResumId');
    }
}
