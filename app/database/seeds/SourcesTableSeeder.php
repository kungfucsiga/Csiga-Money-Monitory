<?php

class SourcesTableSeeder extends Seeder {

	public function run()
	{
		$sources = array(
                    array('name' => 'Citibank'),
                    array('name' => 'Készpénz'),
                    array('name' => 'K&H Bank')
		);

		DB::table('sources')->insert($sources);
	}

}
