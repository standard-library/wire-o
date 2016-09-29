<?php

namespace Tests\Functional;

class ApiTest extends BaseTestCase
{
    /**
     * Test that the index route returns a rendered response
     */
    public function testGetEndpoint()
    {
        $response = $this->runApp('GET', '/');

        $this->assertEquals(200, $response->getStatusCode());
    }

    /**
     * Test that the index route returns a rendered response
     */
    public function testPostEndpoint()
    {
        $response = $this->runApp('POST', '/merge', [
          'pdfPaths' => [
            '/ambience.pdf',
            '/hello.pdf'
          ]
        ]);

        $this->assertEquals(200, $response->getStatusCode());
    }

    /**
     * Test that the index route returns a rendered response
     */
    public function testEndpointReturnsJson()
    {
        $response = $this->runApp('POST', '/merge', [
          'pdfPaths' => [
            '/ambience.pdf',
            '/hello.pdf'
          ]
        ]);

        $expected = '{"mergedPDF":"http:\/\/localhost\/merged\/9cd9f057d4bf4cb0108d30790f733401\/reader.pdf"}';
        $this->assertEquals($expected, (string) $response->getBody());
    }
}
