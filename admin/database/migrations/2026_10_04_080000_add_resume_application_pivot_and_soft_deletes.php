<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('resume_tablel', function (Blueprint $table) {
            $table->softDeletes('Deleted_at');
        });

        Schema::create('jopapplication_resumes', function (Blueprint $table) {
            $table->foreignUuid('jopapplication_id')
                ->references('id')
                ->on('jopapplication')
                ->cascadeOnDelete();
            $table->foreignUuid('resume_id')
                ->references('id')
                ->on('resume_tablel')
                ->cascadeOnDelete();
            $table->unique(['jopapplication_id', 'resume_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jopapplication_resumes');

        Schema::table('resume_tablel', function (Blueprint $table) {
            $table->dropSoftDeletes('Deleted_at');
        });
    }
};
