<?php

class SourcesControllerTest extends TestCase {
	public function testIndex()
	{
		$response = $this->call('GET', 'sources');
		$this->assertTrue($response->isOk());
	}

	public function testShow()
	{
		$response = $this->call('GET', 'sources/1');
		$this->assertTrue($response->isOk());
	}

	public function testCreate()
	{
		$response = $this->call('GET', 'sources/create');
		$this->assertTrue($response->isOk());
	}

	public function testEdit()
	{
		$response = $this->call('GET', 'sources/1/edit');
		$this->assertTrue($response->isOk());
	}
}
