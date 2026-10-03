<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Resumes extends Model
{
    //
        //
    use HasUuids, SoftDeletes;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = "JopApplication";
    protected $fillable = [
        "Fillname",
        "Fileuri",
        "ContactDetiles",
        "Summary",
        "Skills",
        "Expirince",
        "Education",
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
    public function User(){
        return $this->belongsTo(User::class);
    }
    public function Application(){
        return $this->hasMany(Jopapplication::class);
    }
}
