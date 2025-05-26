import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  MapPin, 
  Users, 
  Building, 
  Flag, 
  TrendingUp, 
  Search,
  Edit,
  Plus,
  Phone,
  DollarSign
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CountriesRegions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'countries' | 'cities'>('countries');

  // Complete countries data from CSV file
  const countriesData = [
    { id: 1, name: 'Afghanistan', iso3: 'AFG', iso2: 'AF', phonecode: '+93', capital: 'Kabul', currency: 'AFN', regions: 34, cities: 73, status: 'Active' },
    { id: 2, name: 'Aland Islands', iso3: 'ALA', iso2: 'AX', phonecode: '+358', capital: 'Mariehamn', currency: 'EUR', regions: 16, cities: 2, status: 'Active' },
    { id: 3, name: 'Albania', iso3: 'ALB', iso2: 'AL', phonecode: '+355', capital: 'Tirana', currency: 'ALL', regions: 12, cities: 35, status: 'Active' },
    { id: 4, name: 'Algeria', iso3: 'DZA', iso2: 'DZ', phonecode: '+213', capital: 'Algiers', currency: 'DZD', regions: 48, cities: 84, status: 'Active' },
    { id: 5, name: 'American Samoa', iso3: 'ASM', iso2: 'AS', phonecode: '+1', capital: 'Pago Pago', currency: 'USD', regions: 5, cities: 3, status: 'Active' },
    { id: 6, name: 'Andorra', iso3: 'AND', iso2: 'AD', phonecode: '+376', capital: 'Andorra la Vella', currency: 'EUR', regions: 7, cities: 1, status: 'Active' },
    { id: 7, name: 'Angola', iso3: 'AGO', iso2: 'AO', phonecode: '+244', capital: 'Luanda', currency: 'AOA', regions: 18, cities: 26, status: 'Active' },
    { id: 8, name: 'Anguilla', iso3: 'AIA', iso2: 'AI', phonecode: '+1', capital: 'The Valley', currency: 'XCD', regions: 14, cities: 1, status: 'Active' },
    { id: 9, name: 'Antarctica', iso3: 'ATA', iso2: 'AQ', phonecode: '+672', capital: '', currency: 'AAD', regions: 0, cities: 0, status: 'Restricted' },
    { id: 10, name: 'Antigua and Barbuda', iso3: 'ATG', iso2: 'AG', phonecode: '+1', capital: "St. John's", currency: 'XCD', regions: 6, cities: 2, status: 'Active' },
    { id: 11, name: 'Argentina', iso3: 'ARG', iso2: 'AR', phonecode: '+54', capital: 'Buenos Aires', currency: 'ARS', regions: 23, cities: 445, status: 'Active' },
    { id: 12, name: 'Armenia', iso3: 'ARM', iso2: 'AM', phonecode: '+374', capital: 'Yerevan', currency: 'AMD', regions: 11, cities: 48, status: 'Active' },
    { id: 13, name: 'Aruba', iso3: 'ABW', iso2: 'AW', phonecode: '+297', capital: 'Oranjestad', currency: 'AWG', regions: 0, cities: 1, status: 'Active' },
    { id: 14, name: 'Australia', iso3: 'AUS', iso2: 'AU', phonecode: '+61', capital: 'Canberra', currency: 'AUD', regions: 8, cities: 1030, status: 'Active' },
    { id: 15, name: 'Austria', iso3: 'AUT', iso2: 'AT', phonecode: '+43', capital: 'Vienna', currency: 'EUR', regions: 9, cities: 2357, status: 'Active' },
    { id: 16, name: 'Azerbaijan', iso3: 'AZE', iso2: 'AZ', phonecode: '+994', capital: 'Baku', currency: 'AZN', regions: 66, cities: 75, status: 'Active' },
    { id: 17, name: 'Bahamas', iso3: 'BHS', iso2: 'BS', phonecode: '+1', capital: 'Nassau', currency: 'BSD', regions: 31, cities: 24, status: 'Active' },
    { id: 18, name: 'Bahrain', iso3: 'BHR', iso2: 'BH', phonecode: '+973', capital: 'Manama', currency: 'BHD', regions: 4, cities: 15, status: 'Active' },
    { id: 19, name: 'Bangladesh', iso3: 'BGD', iso2: 'BD', phonecode: '+880', capital: 'Dhaka', currency: 'BDT', regions: 8, cities: 495, status: 'Active' },
    { id: 20, name: 'Barbados', iso3: 'BRB', iso2: 'BB', phonecode: '+1', capital: 'Bridgetown', currency: 'BBD', regions: 11, cities: 7, status: 'Active' },
    { id: 21, name: 'Belarus', iso3: 'BLR', iso2: 'BY', phonecode: '+375', capital: 'Minsk', currency: 'BYN', regions: 6, cities: 113, status: 'Active' },
    { id: 22, name: 'Belgium', iso3: 'BEL', iso2: 'BE', phonecode: '+32', capital: 'Brussels', currency: 'EUR', regions: 3, cities: 589, status: 'Active' },
    { id: 23, name: 'Belize', iso3: 'BLZ', iso2: 'BZ', phonecode: '+501', capital: 'Belmopan', currency: 'BZD', regions: 6, cities: 20, status: 'Active' },
    { id: 24, name: 'Benin', iso3: 'BEN', iso2: 'BJ', phonecode: '+229', capital: 'Porto-Novo', currency: 'XOF', regions: 12, cities: 60, status: 'Active' },
    { id: 25, name: 'Bermuda', iso3: 'BMU', iso2: 'BM', phonecode: '+1', capital: 'Hamilton', currency: 'BMD', regions: 9, cities: 10, status: 'Active' },
    { id: 26, name: 'Bhutan', iso3: 'BTN', iso2: 'BT', phonecode: '+975', capital: 'Thimphu', currency: 'BTN', regions: 20, cities: 4, status: 'Active' },
    { id: 27, name: 'Bolivia', iso3: 'BOL', iso2: 'BO', phonecode: '+591', capital: 'Sucre', currency: 'BOB', regions: 9, cities: 364, status: 'Active' },
    { id: 28, name: 'Bosnia and Herzegovina', iso3: 'BIH', iso2: 'BA', phonecode: '+387', capital: 'Sarajevo', currency: 'BAM', regions: 3, cities: 143, status: 'Active' },
    { id: 29, name: 'Botswana', iso3: 'BWA', iso2: 'BW', phonecode: '+267', capital: 'Gaborone', currency: 'BWP', regions: 10, cities: 27, status: 'Active' },
    { id: 30, name: 'Brazil', iso3: 'BRA', iso2: 'BR', phonecode: '+55', capital: 'Brasilia', currency: 'BRL', regions: 26, cities: 5564, status: 'Active' },
    { id: 31, name: 'British Indian Ocean Territory', iso3: 'IOT', iso2: 'IO', phonecode: '+246', capital: 'Diego Garcia', currency: 'USD', regions: 1, cities: 1, status: 'Restricted' },
    { id: 32, name: 'Brunei', iso3: 'BRN', iso2: 'BN', phonecode: '+673', capital: 'Bandar Seri Begawan', currency: 'BND', regions: 4, cities: 24, status: 'Active' },
    { id: 33, name: 'Bulgaria', iso3: 'BGR', iso2: 'BG', phonecode: '+359', capital: 'Sofia', currency: 'BGN', regions: 28, cities: 265, status: 'Active' },
    { id: 34, name: 'Burkina Faso', iso3: 'BFA', iso2: 'BF', phonecode: '+226', capital: 'Ouagadougou', currency: 'XOF', regions: 13, cities: 49, status: 'Active' },
    { id: 35, name: 'Burundi', iso3: 'BDI', iso2: 'BI', phonecode: '+257', capital: 'Bujumbura', currency: 'BIF', regions: 17, cities: 15, status: 'Active' },
    { id: 36, name: 'Cambodia', iso3: 'KHM', iso2: 'KH', phonecode: '+855', capital: 'Phnom Penh', currency: 'KHR', regions: 24, cities: 194, status: 'Active' },
    { id: 37, name: 'Cameroon', iso3: 'CMR', iso2: 'CM', phonecode: '+237', capital: 'Yaounde', currency: 'XAF', regions: 10, cities: 315, status: 'Active' },
    { id: 38, name: 'Canada', iso3: 'CAN', iso2: 'CA', phonecode: '+1', capital: 'Ottawa', currency: 'CAD', regions: 13, cities: 7490, status: 'Active' },
    { id: 39, name: 'Cape Verde', iso3: 'CPV', iso2: 'CV', phonecode: '+238', capital: 'Praia', currency: 'CVE', regions: 22, cities: 24, status: 'Active' },
    { id: 40, name: 'Cayman Islands', iso3: 'CYM', iso2: 'KY', phonecode: '+1', capital: 'George Town', currency: 'KYD', regions: 8, cities: 7, status: 'Active' },
    { id: 41, name: 'Central African Republic', iso3: 'CAF', iso2: 'CF', phonecode: '+236', capital: 'Bangui', currency: 'XAF', regions: 14, cities: 68, status: 'Active' },
    { id: 42, name: 'Chad', iso3: 'TCD', iso2: 'TD', phonecode: '+235', capital: "N'Djamena", currency: 'XAF', regions: 23, cities: 64, status: 'Active' },
    { id: 43, name: 'Chile', iso3: 'CHL', iso2: 'CL', phonecode: '+56', capital: 'Santiago', currency: 'CLP', regions: 15, cities: 346, status: 'Active' },
    { id: 44, name: 'China', iso3: 'CHN', iso2: 'CN', phonecode: '+86', capital: 'Beijing', currency: 'CNY', regions: 34, cities: 654, status: 'Active' },
    { id: 45, name: 'Colombia', iso3: 'COL', iso2: 'CO', phonecode: '+57', capital: 'Bogota', currency: 'COP', regions: 32, cities: 1123, status: 'Active' },
    { id: 46, name: 'Comoros', iso3: 'COM', iso2: 'KM', phonecode: '+269', capital: 'Moroni', currency: 'KMF', regions: 3, cities: 3, status: 'Active' },
    { id: 47, name: 'Congo', iso3: 'COG', iso2: 'CG', phonecode: '+242', capital: 'Brazzaville', currency: 'XAF', regions: 12, cities: 31, status: 'Active' },
    { id: 48, name: 'Costa Rica', iso3: 'CRI', iso2: 'CR', phonecode: '+506', capital: 'San Jose', currency: 'CRC', regions: 7, cities: 473, status: 'Active' },
    { id: 49, name: 'Croatia', iso3: 'HRV', iso2: 'HR', phonecode: '+385', capital: 'Zagreb', currency: 'HRK', regions: 21, cities: 129, status: 'Active' },
    { id: 50, name: 'Cuba', iso3: 'CUB', iso2: 'CU', phonecode: '+53', capital: 'Havana', currency: 'CUP', regions: 15, cities: 169, status: 'Active' },
    { id: 51, name: 'Cyprus', iso3: 'CYP', iso2: 'CY', phonecode: '+357', capital: 'Nicosia', currency: 'EUR', regions: 6, cities: 45, status: 'Active' },
    { id: 52, name: 'Czech Republic', iso3: 'CZE', iso2: 'CZ', phonecode: '+420', capital: 'Prague', currency: 'CZK', regions: 14, cities: 608, status: 'Active' },
    { id: 53, name: 'Democratic Republic of the Congo', iso3: 'COD', iso2: 'CD', phonecode: '+243', capital: 'Kinshasa', currency: 'CDF', regions: 26, cities: 195, status: 'Active' },
    { id: 54, name: 'Denmark', iso3: 'DNK', iso2: 'DK', phonecode: '+45', capital: 'Copenhagen', currency: 'DKK', regions: 5, cities: 289, status: 'Active' },
    { id: 55, name: 'Djibouti', iso3: 'DJI', iso2: 'DJ', phonecode: '+253', capital: 'Djibouti', currency: 'DJF', regions: 6, cities: 11, status: 'Active' },
    { id: 56, name: 'Dominica', iso3: 'DMA', iso2: 'DM', phonecode: '+1', capital: 'Roseau', currency: 'XCD', regions: 10, cities: 2, status: 'Active' },
    { id: 57, name: 'Dominican Republic', iso3: 'DOM', iso2: 'DO', phonecode: '+1', capital: 'Santo Domingo', currency: 'DOP', regions: 31, cities: 155, status: 'Active' },
    { id: 58, name: 'East Timor', iso3: 'TLS', iso2: 'TL', phonecode: '+670', capital: 'Dili', currency: 'USD', regions: 13, cities: 13, status: 'Active' },
    { id: 59, name: 'Ecuador', iso3: 'ECU', iso2: 'EC', phonecode: '+593', capital: 'Quito', currency: 'USD', regions: 24, cities: 221, status: 'Active' },
    { id: 60, name: 'Egypt', iso3: 'EGY', iso2: 'EG', phonecode: '+20', capital: 'Cairo', currency: 'EGP', regions: 27, cities: 230, status: 'Active' },
    { id: 61, name: 'El Salvador', iso3: 'SLV', iso2: 'SV', phonecode: '+503', capital: 'San Salvador', currency: 'USD', regions: 14, cities: 262, status: 'Active' },
    { id: 62, name: 'Equatorial Guinea', iso3: 'GNQ', iso2: 'GQ', phonecode: '+240', capital: 'Malabo', currency: 'XAF', regions: 7, cities: 7, status: 'Active' },
    { id: 63, name: 'Eritrea', iso3: 'ERI', iso2: 'ER', phonecode: '+291', capital: 'Asmara', currency: 'ERN', regions: 6, cities: 12, status: 'Active' },
    { id: 64, name: 'Estonia', iso3: 'EST', iso2: 'EE', phonecode: '+372', capital: 'Tallinn', currency: 'EUR', regions: 15, cities: 47, status: 'Active' },
    { id: 65, name: 'Ethiopia', iso3: 'ETH', iso2: 'ET', phonecode: '+251', capital: 'Addis Ababa', currency: 'ETB', regions: 9, cities: 120, status: 'Active' },
    { id: 66, name: 'Falkland Islands', iso3: 'FLK', iso2: 'FK', phonecode: '+500', capital: 'Stanley', currency: 'FKP', regions: 2, cities: 2, status: 'Active' },
    { id: 67, name: 'Faroe Islands', iso3: 'FRO', iso2: 'FO', phonecode: '+298', capital: 'Torshavn', currency: 'DKK', regions: 34, cities: 34, status: 'Active' },
    { id: 68, name: 'Fiji', iso3: 'FJI', iso2: 'FJ', phonecode: '+679', capital: 'Suva', currency: 'FJD', regions: 14, cities: 17, status: 'Active' },
    { id: 69, name: 'Finland', iso3: 'FIN', iso2: 'FI', phonecode: '+358', capital: 'Helsinki', currency: 'EUR', regions: 19, cities: 116, status: 'Active' },
    { id: 70, name: 'France', iso3: 'FRA', iso2: 'FR', phonecode: '+33', capital: 'Paris', currency: 'EUR', regions: 27, cities: 36684, status: 'Active' },
    { id: 71, name: 'French Guiana', iso3: 'GUF', iso2: 'GF', phonecode: '+594', capital: 'Cayenne', currency: 'EUR', regions: 2, cities: 22, status: 'Active' },
    { id: 72, name: 'French Polynesia', iso3: 'PYF', iso2: 'PF', phonecode: '+689', capital: 'Papeete', currency: 'XPF', regions: 5, cities: 5, status: 'Active' },
    { id: 73, name: 'Gabon', iso3: 'GAB', iso2: 'GA', phonecode: '+241', capital: 'Libreville', currency: 'XAF', regions: 9, cities: 49, status: 'Active' },
    { id: 74, name: 'Gambia', iso3: 'GMB', iso2: 'GM', phonecode: '+220', capital: 'Banjul', currency: 'GMD', regions: 5, cities: 12, status: 'Active' },
    { id: 75, name: 'Georgia', iso3: 'GEO', iso2: 'GE', phonecode: '+995', capital: 'Tbilisi', currency: 'GEL', regions: 9, cities: 79, status: 'Active' },
    { id: 76, name: 'Germany', iso3: 'DEU', iso2: 'DE', phonecode: '+49', capital: 'Berlin', currency: 'EUR', regions: 16, cities: 4068, status: 'Active' },
    { id: 77, name: 'Ghana', iso3: 'GHA', iso2: 'GH', phonecode: '+233', capital: 'Accra', currency: 'GHS', regions: 10, cities: 216, status: 'Active' },
    { id: 78, name: 'Gibraltar', iso3: 'GIB', iso2: 'GI', phonecode: '+350', capital: 'Gibraltar', currency: 'GIP', regions: 1, cities: 1, status: 'Active' },
    { id: 79, name: 'Greece', iso3: 'GRC', iso2: 'GR', phonecode: '+30', capital: 'Athens', currency: 'EUR', regions: 13, cities: 1000, status: 'Active' },
    { id: 80, name: 'Greenland', iso3: 'GRL', iso2: 'GL', phonecode: '+299', capital: 'Nuuk', currency: 'DKK', regions: 4, cities: 18, status: 'Active' },
    { id: 81, name: 'Grenada', iso3: 'GRD', iso2: 'GD', phonecode: '+1', capital: "St. George's", currency: 'XCD', regions: 6, cities: 6, status: 'Active' },
    { id: 82, name: 'Guadeloupe', iso3: 'GLP', iso2: 'GP', phonecode: '+590', capital: 'Basse-Terre', currency: 'EUR', regions: 2, cities: 32, status: 'Active' },
    { id: 83, name: 'Guam', iso3: 'GUM', iso2: 'GU', phonecode: '+1', capital: 'Hagatna', currency: 'USD', regions: 19, cities: 19, status: 'Active' },
    { id: 84, name: 'Guatemala', iso3: 'GTM', iso2: 'GT', phonecode: '+502', capital: 'Guatemala City', currency: 'GTQ', regions: 22, cities: 331, status: 'Active' },
    { id: 85, name: 'Guernsey', iso3: 'GGY', iso2: 'GG', phonecode: '+44', capital: 'St Peter Port', currency: 'GBP', regions: 10, cities: 10, status: 'Active' },
    { id: 86, name: 'Guinea', iso3: 'GIN', iso2: 'GN', phonecode: '+224', capital: 'Conakry', currency: 'GNF', regions: 33, cities: 38, status: 'Active' },
    { id: 87, name: 'Guinea-Bissau', iso3: 'GNB', iso2: 'GW', phonecode: '+245', capital: 'Bissau', currency: 'XOF', regions: 9, cities: 9, status: 'Active' },
    { id: 88, name: 'Guyana', iso3: 'GUY', iso2: 'GY', phonecode: '+592', capital: 'Georgetown', currency: 'GYD', regions: 10, cities: 10, status: 'Active' },
    { id: 89, name: 'Haiti', iso3: 'HTI', iso2: 'HT', phonecode: '+509', capital: 'Port-au-Prince', currency: 'HTG', regions: 10, cities: 140, status: 'Active' },
    { id: 90, name: 'Honduras', iso3: 'HND', iso2: 'HN', phonecode: '+504', capital: 'Tegucigalpa', currency: 'HNL', regions: 18, cities: 298, status: 'Active' },
    { id: 91, name: 'Hong Kong', iso3: 'HKG', iso2: 'HK', phonecode: '+852', capital: 'Hong Kong', currency: 'HKD', regions: 18, cities: 1, status: 'Active' },
    { id: 92, name: 'Hungary', iso3: 'HUN', iso2: 'HU', phonecode: '+36', capital: 'Budapest', currency: 'HUF', regions: 19, cities: 346, status: 'Active' },
    { id: 93, name: 'Iceland', iso3: 'ISL', iso2: 'IS', phonecode: '+354', capital: 'Reykjavik', currency: 'ISK', regions: 8, cities: 30, status: 'Active' },
    { id: 94, name: 'India', iso3: 'IND', iso2: 'IN', phonecode: '+91', capital: 'New Delhi', currency: 'INR', regions: 36, cities: 4037, status: 'Active' },
    { id: 95, name: 'Indonesia', iso3: 'IDN', iso2: 'ID', phonecode: '+62', capital: 'Jakarta', currency: 'IDR', regions: 34, cities: 1650, status: 'Active' },
    { id: 96, name: 'Iran', iso3: 'IRN', iso2: 'IR', phonecode: '+98', capital: 'Tehran', currency: 'IRR', regions: 31, cities: 1134, status: 'Active' },
    { id: 97, name: 'Iraq', iso3: 'IRQ', iso2: 'IQ', phonecode: '+964', capital: 'Baghdad', currency: 'IQD', regions: 18, cities: 120, status: 'Active' },
    { id: 98, name: 'Ireland', iso3: 'IRL', iso2: 'IE', phonecode: '+353', capital: 'Dublin', currency: 'EUR', regions: 26, cities: 162, status: 'Active' },
    { id: 99, name: 'Isle of Man', iso3: 'IMN', iso2: 'IM', phonecode: '+44', capital: 'Douglas', currency: 'GBP', regions: 24, cities: 24, status: 'Active' },
    { id: 100, name: 'Israel', iso3: 'ISR', iso2: 'IL', phonecode: '+972', capital: 'Jerusalem', currency: 'ILS', regions: 6, cities: 1204, status: 'Active' },
    { id: 101, name: 'Italy', iso3: 'ITA', iso2: 'IT', phonecode: '+39', capital: 'Rome', currency: 'EUR', regions: 20, cities: 7924, status: 'Active' },
    { id: 102, name: 'Ivory Coast', iso3: 'CIV', iso2: 'CI', phonecode: '+225', capital: 'Yamoussoukro', currency: 'XOF', regions: 19, cities: 111, status: 'Active' },
    { id: 103, name: 'Jamaica', iso3: 'JAM', iso2: 'JM', phonecode: '+1', capital: 'Kingston', currency: 'JMD', regions: 14, cities: 26, status: 'Active' },
    { id: 104, name: 'Japan', iso3: 'JPN', iso2: 'JP', phonecode: '+81', capital: 'Tokyo', currency: 'JPY', regions: 47, cities: 1866, status: 'Active' },
    { id: 105, name: 'Jersey', iso3: 'JEY', iso2: 'JE', phonecode: '+44', capital: 'Saint Helier', currency: 'GBP', regions: 12, cities: 12, status: 'Active' },
    { id: 106, name: 'Jordan', iso3: 'JOR', iso2: 'JO', phonecode: '+962', capital: 'Amman', currency: 'JOD', regions: 12, cities: 100, status: 'Active' },
    { id: 107, name: 'Kazakhstan', iso3: 'KAZ', iso2: 'KZ', phonecode: '+7', capital: 'Astana', currency: 'KZT', regions: 14, cities: 171, status: 'Active' },
    { id: 108, name: 'Kenya', iso3: 'KEN', iso2: 'KE', phonecode: '+254', capital: 'Nairobi', currency: 'KES', regions: 47, cities: 69, status: 'Active' },
    { id: 109, name: 'Kiribati', iso3: 'KIR', iso2: 'KI', phonecode: '+686', capital: 'Tarawa', currency: 'AUD', regions: 21, cities: 21, status: 'Active' },
    { id: 110, name: 'Kosovo', iso3: 'XKX', iso2: 'XK', phonecode: '+383', capital: 'Pristina', currency: 'EUR', regions: 7, cities: 29, status: 'Active' },
    { id: 111, name: 'Kuwait', iso3: 'KWT', iso2: 'KW', phonecode: '+965', capital: 'Kuwait City', currency: 'KWD', regions: 6, cities: 20, status: 'Active' },
    { id: 112, name: 'Kyrgyzstan', iso3: 'KGZ', iso2: 'KG', phonecode: '+996', capital: 'Bishkek', currency: 'KGS', regions: 7, cities: 31, status: 'Active' },
    { id: 113, name: 'Laos', iso3: 'LAO', iso2: 'LA', phonecode: '+856', capital: 'Vientiane', currency: 'LAK', regions: 16, cities: 144, status: 'Active' },
    { id: 114, name: 'Latvia', iso3: 'LVA', iso2: 'LV', phonecode: '+371', capital: 'Riga', currency: 'EUR', regions: 36, cities: 76, status: 'Active' },
    { id: 115, name: 'Lebanon', iso3: 'LBN', iso2: 'LB', phonecode: '+961', capital: 'Beirut', currency: 'LBP', regions: 6, cities: 64, status: 'Active' },
    { id: 116, name: 'Lesotho', iso3: 'LSO', iso2: 'LS', phonecode: '+266', capital: 'Maseru', currency: 'LSL', regions: 10, cities: 20, status: 'Active' },
    { id: 117, name: 'Liberia', iso3: 'LBR', iso2: 'LR', phonecode: '+231', capital: 'Monrovia', currency: 'LRD', regions: 15, cities: 15, status: 'Active' },
    { id: 118, name: 'Libya', iso3: 'LBY', iso2: 'LY', phonecode: '+218', capital: 'Tripoli', currency: 'LYD', regions: 22, cities: 86, status: 'Active' },
    { id: 119, name: 'Liechtenstein', iso3: 'LIE', iso2: 'LI', phonecode: '+423', capital: 'Vaduz', currency: 'CHF', regions: 11, cities: 11, status: 'Active' },
    { id: 120, name: 'Lithuania', iso3: 'LTU', iso2: 'LT', phonecode: '+370', capital: 'Vilnius', currency: 'EUR', regions: 10, cities: 103, status: 'Active' },
    { id: 121, name: 'Luxembourg', iso3: 'LUX', iso2: 'LU', phonecode: '+352', capital: 'Luxembourg', currency: 'EUR', regions: 12, cities: 12, status: 'Active' },
    { id: 122, name: 'Macau', iso3: 'MAC', iso2: 'MO', phonecode: '+853', capital: 'Macao', currency: 'MOP', regions: 2, cities: 2, status: 'Active' },
    { id: 123, name: 'Macedonia', iso3: 'MKD', iso2: 'MK', phonecode: '+389', capital: 'Skopje', currency: 'MKD', regions: 84, cities: 34, status: 'Active' },
    { id: 124, name: 'Madagascar', iso3: 'MDG', iso2: 'MG', phonecode: '+261', capital: 'Antananarivo', currency: 'MGA', regions: 23, cities: 114, status: 'Active' },
    { id: 125, name: 'Malawi', iso3: 'MWI', iso2: 'MW', phonecode: '+265', capital: 'Lilongwe', currency: 'MWK', regions: 28, cities: 32, status: 'Active' },
    { id: 126, name: 'Malaysia', iso3: 'MYS', iso2: 'MY', phonecode: '+60', capital: 'Kuala Lumpur', currency: 'MYR', regions: 16, cities: 144, status: 'Active' },
    { id: 127, name: 'Maldives', iso3: 'MDV', iso2: 'MV', phonecode: '+960', capital: 'Male', currency: 'MVR', regions: 21, cities: 7, status: 'Active' },
    { id: 128, name: 'Mali', iso3: 'MLI', iso2: 'ML', phonecode: '+223', capital: 'Bamako', currency: 'XOF', regions: 8, cities: 57, status: 'Active' },
    { id: 129, name: 'Malta', iso3: 'MLT', iso2: 'MT', phonecode: '+356', capital: 'Valletta', currency: 'EUR', regions: 68, cities: 68, status: 'Active' },
    { id: 130, name: 'Marshall Islands', iso3: 'MHL', iso2: 'MH', phonecode: '+692', capital: 'Majuro', currency: 'USD', regions: 24, cities: 24, status: 'Active' },
    { id: 131, name: 'Martinique', iso3: 'MTQ', iso2: 'MQ', phonecode: '+596', capital: 'Fort-de-France', currency: 'EUR', regions: 2, cities: 34, status: 'Active' },
    { id: 132, name: 'Mauritania', iso3: 'MRT', iso2: 'MR', phonecode: '+222', capital: 'Nouakchott', currency: 'MRO', regions: 15, cities: 15, status: 'Active' },
    { id: 133, name: 'Mauritius', iso3: 'MUS', iso2: 'MU', phonecode: '+230', capital: 'Port Louis', currency: 'MUR', regions: 9, cities: 156, status: 'Active' },
    { id: 134, name: 'Mayotte', iso3: 'MYT', iso2: 'YT', phonecode: '+262', capital: 'Mamoudzou', currency: 'EUR', regions: 2, cities: 17, status: 'Active' },
    { id: 135, name: 'Mexico', iso3: 'MEX', iso2: 'MX', phonecode: '+52', capital: 'Mexico City', currency: 'MXN', regions: 32, cities: 2457, status: 'Active' },
    { id: 136, name: 'Micronesia', iso3: 'FSM', iso2: 'FM', phonecode: '+691', capital: 'Palikir', currency: 'USD', regions: 4, cities: 4, status: 'Active' },
    { id: 137, name: 'Moldova', iso3: 'MDA', iso2: 'MD', phonecode: '+373', capital: 'Chisinau', currency: 'MDL', regions: 32, cities: 66, status: 'Active' },
    { id: 138, name: 'Monaco', iso3: 'MCO', iso2: 'MC', phonecode: '+377', capital: 'Monaco', currency: 'EUR', regions: 1, cities: 1, status: 'Active' },
    { id: 139, name: 'Mongolia', iso3: 'MNG', iso2: 'MN', phonecode: '+976', capital: 'Ulaanbaatar', currency: 'MNT', regions: 21, cities: 31, status: 'Active' },
    { id: 140, name: 'Montenegro', iso3: 'MNE', iso2: 'ME', phonecode: '+382', capital: 'Podgorica', currency: 'EUR', regions: 21, cities: 23, status: 'Active' },
    { id: 141, name: 'Montserrat', iso3: 'MSR', iso2: 'MS', phonecode: '+1', capital: 'Plymouth', currency: 'XCD', regions: 3, cities: 3, status: 'Active' },
    { id: 142, name: 'Morocco', iso3: 'MAR', iso2: 'MA', phonecode: '+212', capital: 'Rabat', currency: 'MAD', regions: 75, cities: 221, status: 'Active' },
    { id: 143, name: 'Mozambique', iso3: 'MOZ', iso2: 'MZ', phonecode: '+258', capital: 'Maputo', currency: 'MZN', regions: 11, cities: 129, status: 'Active' },
    { id: 144, name: 'Myanmar', iso3: 'MMR', iso2: 'MM', phonecode: '+95', capital: 'Naypyidaw', currency: 'MMK', regions: 14, cities: 325, status: 'Active' },
    { id: 145, name: 'Namibia', iso3: 'NAM', iso2: 'NA', phonecode: '+264', capital: 'Windhoek', currency: 'NAD', regions: 14, cities: 58, status: 'Active' },
    { id: 146, name: 'Nauru', iso3: 'NRU', iso2: 'NR', phonecode: '+674', capital: 'Yaren', currency: 'AUD', regions: 14, cities: 14, status: 'Active' },
    { id: 147, name: 'Nepal', iso3: 'NPL', iso2: 'NP', phonecode: '+977', capital: 'Kathmandu', currency: 'NPR', regions: 7, cities: 130, status: 'Active' },
    { id: 148, name: 'Netherlands', iso3: 'NLD', iso2: 'NL', phonecode: '+31', capital: 'Amsterdam', currency: 'EUR', regions: 12, cities: 1581, status: 'Active' },
    { id: 149, name: 'Netherlands Antilles', iso3: 'ANT', iso2: 'AN', phonecode: '+599', capital: 'Willemstad', currency: 'ANG', regions: 5, cities: 5, status: 'Active' },
    { id: 150, name: 'New Caledonia', iso3: 'NCL', iso2: 'NC', phonecode: '+687', capital: 'Noumea', currency: 'XPF', regions: 3, cities: 33, status: 'Active' },
    { id: 151, name: 'New Zealand', iso3: 'NZL', iso2: 'NZ', phonecode: '+64', capital: 'Wellington', currency: 'NZD', regions: 16, cities: 66, status: 'Active' },
    { id: 152, name: 'Nicaragua', iso3: 'NIC', iso2: 'NI', phonecode: '+505', capital: 'Managua', currency: 'NIO', regions: 15, cities: 153, status: 'Active' },
    { id: 153, name: 'Niger', iso3: 'NER', iso2: 'NE', phonecode: '+227', capital: 'Niamey', currency: 'XOF', regions: 8, cities: 52, status: 'Active' },
    { id: 154, name: 'Nigeria', iso3: 'NGA', iso2: 'NG', phonecode: '+234', capital: 'Abuja', currency: 'NGN', regions: 37, cities: 926, status: 'Active' },
    { id: 155, name: 'Niue', iso3: 'NIU', iso2: 'NU', phonecode: '+683', capital: 'Alofi', currency: 'NZD', regions: 14, cities: 14, status: 'Active' },
    { id: 156, name: 'Norfolk Island', iso3: 'NFK', iso2: 'NF', phonecode: '+672', capital: 'Kingston', currency: 'AUD', regions: 1, cities: 1, status: 'Active' },
    { id: 157, name: 'North Korea', iso3: 'PRK', iso2: 'KP', phonecode: '+850', capital: 'Pyongyang', currency: 'KPW', regions: 9, cities: 34, status: 'Restricted' },
    { id: 158, name: 'Northern Mariana Islands', iso3: 'MNP', iso2: 'MP', phonecode: '+1', capital: 'Saipan', currency: 'USD', regions: 4, cities: 4, status: 'Active' },
    { id: 159, name: 'Norway', iso3: 'NOR', iso2: 'NO', phonecode: '+47', capital: 'Oslo', currency: 'NOK', regions: 19, cities: 431, status: 'Active' },
    { id: 160, name: 'Oman', iso3: 'OMN', iso2: 'OM', phonecode: '+968', capital: 'Muscat', currency: 'OMR', regions: 11, cities: 12, status: 'Active' },
    { id: 161, name: 'Pakistan', iso3: 'PAK', iso2: 'PK', phonecode: '+92', capital: 'Islamabad', currency: 'PKR', regions: 7, cities: 594, status: 'Active' },
    { id: 162, name: 'Palau', iso3: 'PLW', iso2: 'PW', phonecode: '+680', capital: 'Ngerulmud', currency: 'USD', regions: 16, cities: 16, status: 'Active' },
    { id: 163, name: 'Palestine', iso3: 'PSE', iso2: 'PS', phonecode: '+970', capital: 'East Jerusalem', currency: 'ILS', regions: 16, cities: 611, status: 'Active' },
    { id: 164, name: 'Panama', iso3: 'PAN', iso2: 'PA', phonecode: '+507', capital: 'Panama City', currency: 'PAB', regions: 10, cities: 77, status: 'Active' },
    { id: 165, name: 'Papua New Guinea', iso3: 'PNG', iso2: 'PG', phonecode: '+675', capital: 'Port Moresby', currency: 'PGK', regions: 22, cities: 88, status: 'Active' },
    { id: 166, name: 'Paraguay', iso3: 'PRY', iso2: 'PY', phonecode: '+595', capital: 'Asuncion', currency: 'PYG', regions: 17, cities: 244, status: 'Active' },
    { id: 167, name: 'Peru', iso3: 'PER', iso2: 'PE', phonecode: '+51', capital: 'Lima', currency: 'PEN', regions: 25, cities: 1855, status: 'Active' },
    { id: 168, name: 'Philippines', iso3: 'PHL', iso2: 'PH', phonecode: '+63', capital: 'Manila', currency: 'PHP', regions: 18, cities: 1634, status: 'Active' },
    { id: 169, name: 'Pitcairn', iso3: 'PCN', iso2: 'PN', phonecode: '+872', capital: 'Adamstown', currency: 'NZD', regions: 1, cities: 1, status: 'Active' },
    { id: 170, name: 'Poland', iso3: 'POL', iso2: 'PL', phonecode: '+48', capital: 'Warsaw', currency: 'PLN', regions: 16, cities: 944, status: 'Active' },
    { id: 171, name: 'Portugal', iso3: 'PRT', iso2: 'PT', phonecode: '+351', capital: 'Lisbon', currency: 'EUR', regions: 20, cities: 308, status: 'Active' },
    { id: 172, name: 'Puerto Rico', iso3: 'PRI', iso2: 'PR', phonecode: '+1', capital: 'San Juan', currency: 'USD', regions: 78, cities: 78, status: 'Active' },
    { id: 173, name: 'Qatar', iso3: 'QAT', iso2: 'QA', phonecode: '+974', capital: 'Doha', currency: 'QAR', regions: 7, cities: 7, status: 'Active' },
    { id: 174, name: 'Reunion', iso3: 'REU', iso2: 'RE', phonecode: '+262', capital: 'Saint-Denis', currency: 'EUR', regions: 2, cities: 24, status: 'Active' },
    { id: 175, name: 'Romania', iso3: 'ROU', iso2: 'RO', phonecode: '+40', capital: 'Bucharest', currency: 'RON', regions: 41, cities: 320, status: 'Active' },
    { id: 176, name: 'Russia', iso3: 'RUS', iso2: 'RU', phonecode: '+7', capital: 'Moscow', currency: 'RUB', regions: 85, cities: 1117, status: 'Active' },
    { id: 177, name: 'Rwanda', iso3: 'RWA', iso2: 'RW', phonecode: '+250', capital: 'Kigali', currency: 'RWF', regions: 5, cities: 30, status: 'Active' },
    { id: 178, name: 'Saint Helena', iso3: 'SHN', iso2: 'SH', phonecode: '+290', capital: 'Jamestown', currency: 'SHP', regions: 3, cities: 3, status: 'Active' },
    { id: 179, name: 'Saint Kitts and Nevis', iso3: 'KNA', iso2: 'KN', phonecode: '+1', capital: 'Basseterre', currency: 'XCD', regions: 14, cities: 14, status: 'Active' },
    { id: 180, name: 'Saint Lucia', iso3: 'LCA', iso2: 'LC', phonecode: '+1', capital: 'Castries', currency: 'XCD', regions: 11, cities: 11, status: 'Active' },
    { id: 181, name: 'Saint Pierre and Miquelon', iso3: 'SPM', iso2: 'PM', phonecode: '+508', capital: 'Saint-Pierre', currency: 'EUR', regions: 2, cities: 2, status: 'Active' },
    { id: 182, name: 'Saint Vincent and the Grenadines', iso3: 'VCT', iso2: 'VC', phonecode: '+1', capital: 'Kingstown', currency: 'XCD', regions: 6, cities: 6, status: 'Active' },
    { id: 183, name: 'Samoa', iso3: 'WSM', iso2: 'WS', phonecode: '+685', capital: 'Apia', currency: 'WST', regions: 11, cities: 41, status: 'Active' },
    { id: 184, name: 'San Marino', iso3: 'SMR', iso2: 'SM', phonecode: '+378', capital: 'San Marino', currency: 'EUR', regions: 9, cities: 9, status: 'Active' },
    { id: 185, name: 'Sao Tome and Principe', iso3: 'STP', iso2: 'ST', phonecode: '+239', capital: 'Sao Tome', currency: 'STD', regions: 2, cities: 7, status: 'Active' },
    { id: 186, name: 'Saudi Arabia', iso3: 'SAU', iso2: 'SA', phonecode: '+966', capital: 'Riyadh', currency: 'SAR', regions: 13, cities: 45, status: 'Active' },
    { id: 187, name: 'Senegal', iso3: 'SEN', iso2: 'SN', phonecode: '+221', capital: 'Dakar', currency: 'XOF', regions: 14, cities: 123, status: 'Active' },
    { id: 188, name: 'Serbia', iso3: 'SRB', iso2: 'RS', phonecode: '+381', capital: 'Belgrade', currency: 'RSD', regions: 29, cities: 193, status: 'Active' },
    { id: 189, name: 'Seychelles', iso3: 'SYC', iso2: 'SC', phonecode: '+248', capital: 'Victoria', currency: 'SCR', regions: 25, cities: 26, status: 'Active' },
    { id: 190, name: 'Sierra Leone', iso3: 'SLE', iso2: 'SL', phonecode: '+232', capital: 'Freetown', currency: 'SLL', regions: 4, cities: 20, status: 'Active' },
    { id: 191, name: 'Singapore', iso3: 'SGP', iso2: 'SG', phonecode: '+65', capital: 'Singapore', currency: 'SGD', regions: 5, cities: 1, status: 'Active' },
    { id: 192, name: 'Slovakia', iso3: 'SVK', iso2: 'SK', phonecode: '+421', capital: 'Bratislava', currency: 'EUR', regions: 8, cities: 138, status: 'Active' },
    { id: 193, name: 'Slovenia', iso3: 'SVN', iso2: 'SI', phonecode: '+386', capital: 'Ljubljana', currency: 'EUR', regions: 12, cities: 212, status: 'Active' },
    { id: 194, name: 'Solomon Islands', iso3: 'SLB', iso2: 'SB', phonecode: '+677', capital: 'Honiara', currency: 'SBD', regions: 10, cities: 10, status: 'Active' },
    { id: 195, name: 'Somalia', iso3: 'SOM', iso2: 'SO', phonecode: '+252', capital: 'Mogadishu', currency: 'SOS', regions: 18, cities: 23, status: 'Active' },
    { id: 196, name: 'South Africa', iso3: 'ZAF', iso2: 'ZA', phonecode: '+27', capital: 'Cape Town', currency: 'ZAR', regions: 9, cities: 1214, status: 'Active' },
    { id: 197, name: 'South Georgia and the South Sandwich Islands', iso3: 'SGS', iso2: 'GS', phonecode: '+500', capital: 'Grytviken', currency: 'GBP', regions: 0, cities: 0, status: 'Restricted' },
    { id: 198, name: 'South Korea', iso3: 'KOR', iso2: 'KR', phonecode: '+82', capital: 'Seoul', currency: 'KRW', regions: 17, cities: 232, status: 'Active' },
    { id: 199, name: 'South Sudan', iso3: 'SSD', iso2: 'SS', phonecode: '+211', capital: 'Juba', currency: 'SSP', regions: 10, cities: 35, status: 'Active' },
    { id: 200, name: 'Spain', iso3: 'ESP', iso2: 'ES', phonecode: '+34', capital: 'Madrid', currency: 'EUR', regions: 19, cities: 8131, status: 'Active' },
    { id: 201, name: 'Sri Lanka', iso3: 'LKA', iso2: 'LK', phonecode: '+94', capital: 'Colombo', currency: 'LKR', regions: 9, cities: 236, status: 'Active' },
    { id: 202, name: 'Sudan', iso3: 'SDN', iso2: 'SD', phonecode: '+249', capital: 'Khartoum', currency: 'SDG', regions: 18, cities: 162, status: 'Active' },
    { id: 203, name: 'Suriname', iso3: 'SUR', iso2: 'SR', phonecode: '+597', capital: 'Paramaribo', currency: 'SRD', regions: 10, cities: 62, status: 'Active' },
    { id: 204, name: 'Svalbard and Jan Mayen', iso3: 'SJM', iso2: 'SJ', phonecode: '+47', capital: 'Longyearbyen', currency: 'NOK', regions: 0, cities: 0, status: 'Restricted' },
    { id: 205, name: 'Swaziland', iso3: 'SWZ', iso2: 'SZ', phonecode: '+268', capital: 'Mbabane', currency: 'SZL', regions: 4, cities: 16, status: 'Active' },
    { id: 206, name: 'Sweden', iso3: 'SWE', iso2: 'SE', phonecode: '+46', capital: 'Stockholm', currency: 'SEK', regions: 21, cities: 312, status: 'Active' },
    { id: 207, name: 'Switzerland', iso3: 'CHE', iso2: 'CH', phonecode: '+41', capital: 'Bern', currency: 'CHF', regions: 26, cities: 2408, status: 'Active' },
    { id: 208, name: 'Syria', iso3: 'SYR', iso2: 'SY', phonecode: '+963', capital: 'Damascus', currency: 'SYP', regions: 14, cities: 65, status: 'Restricted' },
    { id: 209, name: 'Taiwan', iso3: 'TWN', iso2: 'TW', phonecode: '+886', capital: 'Taipei', currency: 'TWD', regions: 13, cities: 151, status: 'Active' },
    { id: 210, name: 'Tajikistan', iso3: 'TJK', iso2: 'TJ', phonecode: '+992', capital: 'Dushanbe', currency: 'TJS', regions: 4, cities: 19, status: 'Active' },
    { id: 211, name: 'Tanzania', iso3: 'TZA', iso2: 'TZ', phonecode: '+255', capital: 'Dodoma', currency: 'TZS', regions: 26, cities: 120, status: 'Active' },
    { id: 212, name: 'Thailand', iso3: 'THA', iso2: 'TH', phonecode: '+66', capital: 'Bangkok', currency: 'THB', regions: 77, cities: 1001, status: 'Active' },
    { id: 213, name: 'Togo', iso3: 'TGO', iso2: 'TG', phonecode: '+228', capital: 'Lome', currency: 'XOF', regions: 5, cities: 40, status: 'Active' },
    { id: 214, name: 'Tokelau', iso3: 'TKL', iso2: 'TK', phonecode: '+690', capital: '', currency: 'NZD', regions: 3, cities: 3, status: 'Active' },
    { id: 215, name: 'Tonga', iso3: 'TON', iso2: 'TO', phonecode: '+676', capital: "Nuku'alofa", currency: 'TOP', regions: 5, cities: 5, status: 'Active' },
    { id: 216, name: 'Trinidad and Tobago', iso3: 'TTO', iso2: 'TT', phonecode: '+1', capital: 'Port of Spain', currency: 'TTD', regions: 9, cities: 77, status: 'Active' },
    { id: 217, name: 'Tunisia', iso3: 'TUN', iso2: 'TN', phonecode: '+216', capital: 'Tunis', currency: 'TND', regions: 24, cities: 264, status: 'Active' },
    { id: 218, name: 'Turkey', iso3: 'TUR', iso2: 'TR', phonecode: '+90', capital: 'Ankara', currency: 'TRY', regions: 81, cities: 973, status: 'Active' },
    { id: 219, name: 'Turkmenistan', iso3: 'TKM', iso2: 'TM', phonecode: '+993', capital: 'Ashgabat', currency: 'TMT', regions: 5, cities: 42, status: 'Active' },
    { id: 220, name: 'Turks and Caicos Islands', iso3: 'TCA', iso2: 'TC', phonecode: '+1', capital: 'Cockburn Town', currency: 'USD', regions: 6, cities: 6, status: 'Active' },
    { id: 221, name: 'Tuvalu', iso3: 'TUV', iso2: 'TV', phonecode: '+688', capital: 'Funafuti', currency: 'AUD', regions: 9, cities: 9, status: 'Active' },
    { id: 222, name: 'Uganda', iso3: 'UGA', iso2: 'UG', phonecode: '+256', capital: 'Kampala', currency: 'UGX', regions: 4, cities: 125, status: 'Active' },
    { id: 223, name: 'Ukraine', iso3: 'UKR', iso2: 'UA', phonecode: '+380', capital: 'Kiev', currency: 'UAH', regions: 24, cities: 457, status: 'Active' },
    { id: 224, name: 'United Arab Emirates', iso3: 'ARE', iso2: 'AE', phonecode: '+971', capital: 'Abu Dhabi', currency: 'AED', regions: 7, cities: 213, status: 'Active' },
    { id: 225, name: 'United Kingdom', iso3: 'GBR', iso2: 'GB', phonecode: '+44', capital: 'London', currency: 'GBP', regions: 232, cities: 1615, status: 'Active' },
    { id: 226, name: 'United States', iso3: 'USA', iso2: 'US', phonecode: '+1', capital: 'Washington', currency: 'USD', regions: 51, cities: 19495, status: 'Active' },
    { id: 227, name: 'Uruguay', iso3: 'URY', iso2: 'UY', phonecode: '+598', capital: 'Montevideo', currency: 'UYU', regions: 19, cities: 183, status: 'Active' },
    { id: 228, name: 'Uzbekistan', iso3: 'UZB', iso2: 'UZ', phonecode: '+998', capital: 'Tashkent', currency: 'UZS', regions: 12, cities: 120, status: 'Active' },
    { id: 229, name: 'Vanuatu', iso3: 'VUT', iso2: 'VU', phonecode: '+678', capital: 'Port Vila', currency: 'VUV', regions: 6, cities: 6, status: 'Active' },
    { id: 230, name: 'Vatican', iso3: 'VAT', iso2: 'VA', phonecode: '+379', capital: 'Vatican City', currency: 'EUR', regions: 1, cities: 1, status: 'Active' },
    { id: 231, name: 'Venezuela', iso3: 'VEN', iso2: 'VE', phonecode: '+58', capital: 'Caracas', currency: 'VEF', regions: 23, cities: 1482, status: 'Active' },
    { id: 232, name: 'Vietnam', iso3: 'VNM', iso2: 'VN', phonecode: '+84', capital: 'Hanoi', currency: 'VND', regions: 58, cities: 691, status: 'Active' },
    { id: 233, name: 'Virgin Islands, British', iso3: 'VGB', iso2: 'VG', phonecode: '+1', capital: 'Road Town', currency: 'USD', regions: 1, cities: 1, status: 'Active' },
    { id: 234, name: 'Virgin Islands, U.S.', iso3: 'VIR', iso2: 'VI', phonecode: '+1', capital: 'Charlotte Amalie', currency: 'USD', regions: 3, cities: 3, status: 'Active' },
    { id: 235, name: 'Wallis and Futuna', iso3: 'WLF', iso2: 'WF', phonecode: '+681', capital: 'Mata Utu', currency: 'XPF', regions: 3, cities: 3, status: 'Active' },
    { id: 236, name: 'Western Sahara', iso3: 'ESH', iso2: 'EH', phonecode: '+212', capital: 'El Aaiun', currency: 'MAD', regions: 3, cities: 3, status: 'Restricted' },
    { id: 237, name: 'Yemen', iso3: 'YEM', iso2: 'YE', phonecode: '+967', capital: 'Sanaa', currency: 'YER', regions: 22, cities: 333, status: 'Active' },
    { id: 238, name: 'Zambia', iso3: 'ZMB', iso2: 'ZM', phonecode: '+260', capital: 'Lusaka', currency: 'ZMW', regions: 10, cities: 56, status: 'Active' },
    { id: 239, name: 'Zimbabwe', iso3: 'ZWE', iso2: 'ZW', phonecode: '+263', capital: 'Harare', currency: 'ZWL', regions: 8, cities: 49, status: 'Active' }
  ];

  // Cities data (sample from major countries)
  const citiesData = [
    { id: 1, name: 'Kabul', country: 'Afghanistan', lat: 34.5253, lng: 69.1783, population: 4273156, capital: 'Primary' },
    { id: 2, name: 'Kandahar', country: 'Afghanistan', lat: 31.62, lng: 65.7158, population: 614254, capital: 'Admin' },
    { id: 3, name: 'Tirana', country: 'Albania', lat: 41.3272, lng: 19.8186, population: 418495, capital: 'Primary' },
    { id: 4, name: 'Durres', country: 'Albania', lat: 41.3133, lng: 19.4458, population: 153614, capital: 'Admin' },
    { id: 5, name: 'Algiers', country: 'Algeria', lat: 36.7325, lng: 3.0872, population: 2364230, capital: 'Primary' },
    { id: 6, name: 'Oran', country: 'Algeria', lat: 35.6969, lng: -0.6331, population: 803329, capital: 'Admin' },
    { id: 7, name: 'Buenos Aires', country: 'Argentina', lat: -34.6118, lng: -58.3960, population: 15594428, capital: 'Primary' },
    { id: 8, name: 'Cordoba', country: 'Argentina', lat: -31.4135, lng: -64.1811, population: 1391374, capital: 'Admin' },
    { id: 9, name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, population: 5312163, capital: 'Admin' },
    { id: 10, name: 'Melbourne', country: 'Australia', lat: -37.8136, lng: 144.9631, population: 5078193, capital: 'Admin' },
    { id: 11, name: 'Toronto', country: 'Canada', lat: 43.7001, lng: -79.4163, population: 6196731, capital: 'Admin' },
    { id: 12, name: 'Montreal', country: 'Canada', lat: 45.5017, lng: -73.5673, population: 4098927, capital: 'Admin' },
    { id: 13, name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, population: 11017230, capital: 'Primary' },
    { id: 14, name: 'Lyon', country: 'France', lat: 45.7640, lng: 4.8357, population: 1719268, capital: 'Admin' },
    { id: 15, name: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, population: 3677472, capital: 'Primary' },
    { id: 16, name: 'Hamburg', country: 'Germany', lat: 53.5511, lng: 9.9937, population: 1945532, capital: 'Admin' },
    { id: 17, name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, population: 37274000, capital: 'Primary' },
    { id: 18, name: 'Osaka', country: 'Japan', lat: 34.6937, lng: 135.5023, population: 18967459, capital: 'Admin' },
    { id: 19, name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, population: 9648110, capital: 'Primary' },
    { id: 20, name: 'Birmingham', country: 'United Kingdom', lat: 52.4862, lng: -1.8904, population: 2607437, capital: 'Admin' }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'restricted': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const filteredCountries = useMemo(() => {
    return countriesData.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           country.iso2.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           country.iso3.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || country.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const filteredCities = useMemo(() => {
    return citiesData.filter(city => {
      const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           city.country.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900/20 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Countries & Regions</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage global geographic data and regional hierarchies</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add New Country
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <Globe className="h-8 w-8 text-blue-600 mb-3" />
              <p className="text-sm text-muted-foreground">Total Countries</p>
              <p className="text-3xl font-bold text-foreground">{countriesData.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <MapPin className="h-8 w-8 text-green-600 mb-3" />
              <p className="text-sm text-muted-foreground">Active Countries</p>
              <p className="text-3xl font-bold text-foreground">{countriesData.filter(c => c.status === 'Active').length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <Flag className="h-8 w-8 text-purple-600 mb-3" />
              <p className="text-sm text-muted-foreground">Total Regions</p>
              <p className="text-3xl font-bold text-foreground">{countriesData.reduce((sum, country) => sum + country.regions, 0)}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <Building className="h-8 w-8 text-orange-600 mb-3" />
              <p className="text-sm text-muted-foreground">Total Cities</p>
              <p className="text-3xl font-bold text-foreground">{citiesData.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tab Navigation and Search */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              <Button
                variant={activeTab === 'countries' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('countries')}
                className="text-sm"
              >
                Countries ({countriesData.length})
              </Button>
              <Button
                variant={activeTab === 'cities' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('cities')}
                className="text-sm"
              >
                Cities ({citiesData.length})
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Country Management Section */}
          {activeTab === 'countries' && (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-foreground">Country Management</h2>
                <p className="text-sm text-muted-foreground mb-4">Manage country information, codes, and city data</p>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search countries by name or code..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="restricted">Restricted</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Countries Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Country</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Codes</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Contact</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Regions</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Cities</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredCountries.map((country) => (
                      <tr key={country.id} className="hover:bg-muted/50">
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                              <Flag className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="font-medium text-foreground">{country.name}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="text-sm">
                            <div className="text-foreground">{country.iso3}</div>
                            <div className="text-muted-foreground">{country.iso2}</div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="text-sm">
                            <div className="flex items-center text-foreground">
                              <Phone className="h-3 w-3 mr-1" />
                              {country.phonecode}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <DollarSign className="h-3 w-3 mr-1" />
                              {country.currency}
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-sm font-medium text-foreground">{country.regions}</span>
                        </td>
                        <td className="py-4">
                          <span className="text-sm font-medium text-foreground">{country.cities}</span>
                        </td>
                        <td className="py-4">
                          <Badge variant="secondary" className={getStatusColor(country.status)}>
                            {country.status}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Cities Management Section */}
          {activeTab === 'cities' && (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-foreground">Cities Management</h2>
                <p className="text-sm text-muted-foreground mb-4">Manage city information and geographical data</p>
                
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search cities by name or country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Cities Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="pb-3 text-sm font-medium text-muted-foreground">City</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Country</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Coordinates</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Population</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Type</th>
                      <th className="pb-3 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredCities.map((city) => (
                      <tr key={city.id} className="hover:bg-muted/50">
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                              <MapPin className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="font-medium text-foreground">{city.name}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-foreground">{city.country}</span>
                        </td>
                        <td className="py-4">
                          <div className="text-xs text-muted-foreground">
                            <div>Lat: {city.lat.toFixed(4)}</div>
                            <div>Lng: {city.lng.toFixed(4)}</div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-sm font-medium text-foreground">
                            {city.population.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4">
                          <Badge 
                            variant="outline" 
                            className={city.capital === 'Primary' ? 'border-orange-300 text-orange-700' : 'border-blue-300 text-blue-700'}
                          >
                            {city.capital}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CountriesRegions;