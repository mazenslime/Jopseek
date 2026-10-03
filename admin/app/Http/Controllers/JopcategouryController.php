<?php

namespace App\Http\Controllers;

use App\Http\Requests\JopCategouryRequest;
use App\Models\JopCategoury;
use GuzzleHttp\Psr7\Query;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JopcategouryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        if(request()->has("Archive")) {
            $jopcateg = JopCategoury::onlyTrashed()->paginate(5);
        }else{
            $jopcateg = JopCategoury::paginate(5);
        }
        return Inertia::render('categoure/Index', [
            'jopcateg' => $jopcateg,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('categoure/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JopCategouryRequest $request)
    {
        JopCategoury::create(['Name' => $request->input('Name')]);

        return to_route('Jopcategoury.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(JopCategoury $jopCategoury)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $jopCategourys = JopCategoury::findOrFail($id);
        return Inertia::render('categoure/update',compact('jopCategourys'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JopCategouryRequest $request,$id)
    {
        $jopCategourys = JopCategoury::findOrFail($id);
        $jopCategourys->update(['Name' => $request->input('Name')]);
        return to_route('Jopcategoury.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        JopCategoury::destroy($id);
        return  to_route('Jopcategoury.index',['sucsses'=>'Deleted sucsses']);

    }
}
