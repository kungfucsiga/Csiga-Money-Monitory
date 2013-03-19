<?php

class OverviewsController extends BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
            
            $overviews = DB::table('overviews')
                        ->join('sources', 'sources.id', '=', 'overviews.source_id')
                        ->select('overviews.source_id', 'overviews.source_value', 'overviews.date','sources.name')
                        ->get();
            
            return json_encode($overviews);
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
            $all_input = Input::all();
            $date = date('Y-m') . '-01';
            
            foreach($all_input as $key => $value) {
                
                $exploded_key = explode('-', $key);
                $source_id = $exploded_key[2];
                
                DB::table('overviews')->insert(
                    array(
                        'source_id' => $source_id, 
                        'source_value' => $value,
                        'date' => $date
                    )
                );
            }
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
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
		//
	}

}