<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('company', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('Adderses');
            $table->string('Indastry');
            $table->string('Website')->nullable();
            $table->foreignUuid('Ownerid')->references('id')->on('users')->onDelete('cascade');
            $table->softDeletes('Deleted_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company');
    }
};
