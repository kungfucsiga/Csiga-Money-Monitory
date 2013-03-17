<?php

class OverviewsControllerTest extends TestCase {
	public function testIndex()
	{
		$response = $this->call('GET', 'overviews');
		$this->assertTrue($response->isOk());
	}

	public function testShow()
	{
		$response = $this->call('GET', 'overviews/1');
		$this->assertTrue($response->isOk());
	}

	public function testCreate()
	{
		$response = $this->call('GET', 'overviews/create');
		$this->assertTrue($response->isOk());
	}

	public function testEdit()
	{
		$response = $this->call('GET', 'overviews/1/edit');
		$this->assertTrue($response->isOk());
	}
}
