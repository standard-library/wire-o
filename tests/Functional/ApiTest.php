<?php

namespace Tests\Functional;

class ApiTest extends BaseTestCase
{
    /**
     * Test that the index route returns a rendered response
     */
    public function testGetEndpoint()
    {
        $response = $this->runApp('POST', '/merge');

        $this->assertEquals(200, $response->getStatusCode());
    }

    /**
     * Test that the index route returns a rendered response
     */
    public function testEndpointReturnsJson()
    {
        $response = $this->runApp('POST', '/merge');

        $this->assertEquals('{"one":"two"}', (string) $response->getBody());
    }
}
