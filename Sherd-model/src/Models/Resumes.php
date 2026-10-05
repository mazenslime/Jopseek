<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Resumes extends Model
{
    //
        //
    use HasUuids ;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'resume_tablel';
    public const DELETED_AT = 'Deleted_at';
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
    public function User(): BelongsTo
    {
        return $this->belongsTo(User::class, 'Userid', 'id');
    }

    public function Application(): HasMany
    {
        return $this->hasMany(Jopapplication::class,'ResumId','id');
    }

}
