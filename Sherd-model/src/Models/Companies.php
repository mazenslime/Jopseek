<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Override;
use Pest\Mutate\Mutators\Number\IncrementInteger;

class Companies extends Model
{
    //
    use HasUuids, SoftDeletes;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = "company";
    protected $fillable = [
        "Name",
        "Adderses",
        "Indastry",
        "Website",
        "Ownerid",
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

    public function jopvacanses(){
        return $this->hasMany(Jopvacancies::class, 'Companyid');
    }
    public function owners(){
        return $this->belongsTo(User::class,'Ownerid','id');
    }
}
