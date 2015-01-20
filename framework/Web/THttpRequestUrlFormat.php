<?php
/**
 * THttpRequest, THttpCookie, THttpCookieCollection, TUri class file
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @link http://www.pradosoft.com/
 * @copyright Copyright &copy; 2005-2014 PradoSoft
 * @license http://www.pradosoft.com/license/
 * @package System.Web
 */

/**
 * THttpRequestUrlFormat class.
 * THttpRequestUrlFormat defines the enumerable type for the possible URL formats
 * that can be recognized by {@link THttpRequest}.
 *
 * The following enumerable values are defined:
 * - Get: the URL format is like /path/to/index.php?name1=value1&name2=value2...
 * - Path: the URL format is like /path/to/index.php/name1,value1/name2,value2...
 * - HiddenPath: the URL format is like /path/to/name1,value1/name2,value2...
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @package System.Web
 * @since 3.0.4
 */
class THttpRequestUrlFormat extends TEnumerable
{
	const Get='Get';
	const Path='Path';
	const HiddenPath='HiddenPath';
}