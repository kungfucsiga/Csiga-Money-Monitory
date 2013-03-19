<?php

class OverviewsController extends BaseController {
    
    
        private function getLastDateString($date_string) {
            
            $exploded_string = explode('-',$date_string);
            $year = $exploded_string[0];
            $month = $exploded_string[1];
            
            $month = (int)$month;
            $month--;
            
            if ($month == 0) {
                $month = 12;
                $year = (int)$year;
                $year--;
            }
            
            if ( strlen($month) == 1) $month = '0'.$month;
            $date_string = $year . '-' . $month . '-01';
            
            return $date_string;
        }

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
            
            foreach($overviews as $overview) {
                
                $source_id = $overview->source_id;
                $source_value = (int)$overview->source_value;
                $last_date_string = $this->getLastDateString($overview->date);
                
                $result = DB::table('overviews')
                            ->where('source_id', '=', $source_id)
                            ->where('date', '=', "$last_date_string")
                            ->first();
                
                if (is_object($result)) {
                    
                    $last_month_source_value = (int)$result->source_value;
                    $difference = $source_value - $last_month_source_value;
                }
                else $difference = 0;
                
                $overview->last_month_difference = $difference;
            }

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