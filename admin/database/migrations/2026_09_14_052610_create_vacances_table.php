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
        Schema::create('vacances', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('Title');
            $table->string('Description');
            $table->string('Location');
            $table->enum('Type', ['Full-time','Contract','Hybrid','Remote']);
            $table->decimal('Salary',8,2)->default(0);
            $table->text('Requiredskills');
            $table->integer('Viewcount')->default(0);
            $table->foreignUuid('Companyid')->references('id')->on('company')->onDelete('cascade');
            $table->foreignUuid('Categouryid')->references('id')->on('jopcategoury')->onDelete('cascade');
            $table->softDeletes('Deleted_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacances');
    }
};
