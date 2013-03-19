<?php

class SourcesController extends BaseController {
    
	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
            $sources = Sources::all();
	    return $sources;
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
            
            $input = Input::all();
            $sourceName = $input['sourceName'];
            DB::table('sources')->insert(
                array('name' => $sourceName)
            );
            
            echo json_encode(array('success' => true));
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
            $source = Sources::find($id);
            echo json_encode($source->name);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
            
	}
        
        
        /**
         * Deleting a source
         * 
         * @param type $id
         */
        public function deleteSource($id) {
            
            $source = Sources::find($id);
            $source->delete();
        }
}