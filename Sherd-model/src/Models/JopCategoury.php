<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JopCategoury extends Model
{
     use HasUuids, SoftDeletes;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = "JopCategoury";
    protected $fillable = [
        "Name",
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

    public function Vacance(){
        return $this->hasMany(Jopvacancies::class, 'Categouryid');
    }
}
