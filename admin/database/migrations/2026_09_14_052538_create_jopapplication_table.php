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
        Schema::create('jopapplication', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->enum('Status',['pendding','accepted','rejected'])->default('pendding');
            $table->float('Aigenratedscore')->default(0);
            $table->text('Aigenratedfeedback')->nullable();
            $table->foreignUuid('Jobid');
            $table->foreignUuid('ResumId');
            $table->foreignUuid('Userid');
            $table->softDeletes('Deleted_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jopapplication');
    }
};
