<?php

class OverviewsTableSeeder extends Seeder {

	public function run()
	{
		$overviews = array(
                    
                    array('source_id' => '1','source_value' => 450000,'date' => '2013-03'),
                    array('source_id' => '2','source_value' => 3000,'date' => '2013-03'),
                    array('source_id' => '3','source_value' => 19000,'date' => '2013-03'),
                    array('source_id' => '4','source_value' => 27000,'date' => '2013-03'),
                    array('source_id' => '5','source_value' => 32000,'date' => '2013-03'),
                    array('source_id' => '6','source_value' => 7600,'date' => '2013-03'),
		);

		DB::table('overviews')->insert($overviews);
	}

}
