<?php

use App\Models\Companies;
use App\Models\User;

it('updates a company without requiring owner details', function () {
    $owner = User::factory()->create();

    $company = Companies::create([
        'Name' => 'Original Company',
        'Adderses' => 'Original Address',
        'Indastry' => 'Original Industry',
        'Website' => 'https://original.example.com',
        'Ownerid' => $owner->id,
    ]);

    $response = $this->put(route('companies.update', $company), [
        'Name' => 'Updated Company',
        'Adderses' => 'Updated Address',
        'Indastry' => 'Updated Industry',
        'Website' => 'https://updated.example.com',
    ]);

    $response->assertRedirect(route('companies.index'));
    $response->assertSessionHas('success', 'Company updated successfully.');

    $this->assertDatabaseHas('company', [
        'id' => $company->id,
        'name' => 'Updated Company',
        'Adderses' => 'Updated Address',
        'Indastry' => 'Updated Industry',
        'Website' => 'https://updated.example.com',
    ]);
});
