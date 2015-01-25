<?php
/**
 * TSlider class file.
 *
 * @author Christophe Boulain <Christophe.Boulain@gmail.com>
 * @link http://www.pradosoft.com/
 * @copyright Copyright &copy; 2005-2014 PradoSoft
 * @license http://www.pradosoft.com/license/
 * @package Prado\Web\UI\WebControls
 * @since 3.1.1
 */

namespace Prado\Web\UI\WebControls;

/**
 * TSliderDirection class.
 *
 * TSliderDirection defines the enumerable type for the possible direction that can be used in a {@link TSlider}
 *
 * The following enumerable values are defined :
 * - Horizontal : Horizontal slider
 * - Vertical : Vertical slider
 *
 * @author Christophe Boulain <Christophe.Boulain@gmail.com>
 * @package Prado\Web\UI\WebControls
 * @since 3.1.1
 */
class TSliderDirection extends \Prado\TEnumerable
{
	const Horizontal='Horizontal';
	const Vertical='Vertical';
}