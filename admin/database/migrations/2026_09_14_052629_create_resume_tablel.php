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
        Schema::create('resume_tablel', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('Fillname');
            $table->string('Fileuri');
            $table->string('ContactDetiles');
            $table->string('Summary');
            $table->string('Skills');
            $table->string('Expirince');
            $table->string('Education');
            $table->foreignUuid('Userid')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resume_tablel');
    }
};
