<?php

class QuickstartDataGrid3TestCase extends PradoGenericSelenium2Test
{
	function test()
	{
		$this->url("../../demos/quickstart/index.php?page=Controls.Samples.TDataGrid.Sample3&amp;notheme=true&amp;lang=en");

		// verify the 2nd row of data
		$this->assertContains("Design Patterns: Elements of Reusable Object-Oriented Software", $this->source());
		$this->assertContains("Addison-Wesley Professional", $this->source());
		$this->assertContains("$47.04", $this->source());
		$this->assertAttribute('ctl0_body_DataGrid_ctl2_ctl4@checked','regexp:true|checked');
		$this->assertAttribute('ctl0_body_DataGrid_ctl2_ctl4@disabled','regexp:true|disabled');
		//$this->assertElementPresent("//img[@src='images/star5.gif']",'');

		// edit the 2nd row
		$this->byId("ctl0_body_DataGrid_ctl2_ctl7")->click();
		$this->type("ctl0\$body\$DataGrid\$ctl2\$ctl1", "Design Pattern: Elements of Reusable Object-Oriented Software");
		$this->type("ctl0\$body\$DataGrid\$ctl2\$ctl3", "Addison Wesley Professional");
		$this->type("ctl0\$body\$DataGrid\$ctl2\$ctl5", "\$57.04");
		$this->byXPath("//input[@name='ctl0\$body\$DataGrid\$ctl2\$ctl7']")->click();
		$this->select("ctl0\$body\$DataGrid\$ctl2\$ctl9", "1");
		$this->byLinkText("Save")->click();

		// verify the 2nd row is saved
		$this->assertContains("Design Pattern: Elements of Reusable Object-Oriented Software", $this->source());
		$this->assertContains("Addison Wesley Professional", $this->source());
		$this->assertContains("$57.04", $this->source());
		$this->assertAttribute("ctl0_body_DataGrid_ctl2_ctl4@checked", null);
		$this->assertAttribute('ctl0_body_DataGrid_ctl2_ctl4@disabled','regexp:true|disabled');
		//$this->assertElementPresent("//img[@src='images/star1.gif']",'');

		// verify cancel editting the 3rd row
		$this->byId("ctl0_body_DataGrid_ctl3_ctl7")->click();
		$this->byLinkText("Cancel")->click();
		$this->assertContains("Design Patterns Explained : A New Perspective on Object-Oriented Design", $this->source());

		// verify deleting
		$this->byId("ctl0_body_DataGrid_ctl3_ctl9")->click();

		$this->assertEquals("Are you sure?", $this->alertText());
		$this->acceptAlert();

		$this->pause(500);
		$this->assertNotContains("Design Patterns Explained : A New Perspective on Object-Oriented Design", $this->source());

		$this->assertContains("Extreme Programming Explained : Embrace Change", $this->source());
		$this->byId("ctl0_body_DataGrid_ctl6_ctl9")->click();

		$this->assertEquals("Are you sure?", $this->alertText());
		$this->dismissAlert();

		$this->assertContains("Extreme Programming Explained : Embrace Change", $this->source());
	}
}
