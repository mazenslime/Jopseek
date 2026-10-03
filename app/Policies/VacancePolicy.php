<?php

namespace App\Policies;

use App\Models\Jopvacancies;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class VacancePolicy
{
    /**
     * Determine whether the user can view any models.
     */

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Jopvacancies $jopvacancies): bool
    {
        return $user->Role=="admin"|| $user->company?->id==$jopvacancies->Companyid;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user,Jopvacancies $jopvacancies): bool
    {
        return $user->company->id==$jopvacancies->Companyid || $user->Role=="admin";
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Jopvacancies $jopvacancies): bool
    {
        return $user->company->id==$jopvacancies->Companyid || $user->Role=="admin";
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Jopvacancies $jopvacancies): bool
    {
        return $user->company->id==$jopvacancies->Companyid || $user->Role=="admin";
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Jopvacancies $jopvacancies): bool
    {
        return $user->company->id==$jopvacancies->Companyid || $user->Role=="admin";
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Jopvacancies $jopvacancies): bool
    {
        return $user->company->id==$jopvacancies->Companyid || $user->Role=="admin";
    }
}
