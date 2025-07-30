import React, { useState } from 'react';
import { Download, FileText, Eye, Search } from 'lucide-react';

interface TemplatesProps {
  t: any;
  showToast: (message: string) => void;
}

const Templates: React.FC<TemplatesProps> = ({ t, showToast }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const templates = [
    {
      id: 1,
      title: "Legal Notice Template",
      category: "notice",
      description: "Standard legal notice format for various disputes",
      downloads: 1250,
      rating: 4.8,
      preview: "This is a formal legal notice template that can be customized for property disputes, contract breaches, and other legal matters...",
      languages: ["English", "Hindi"]
    },
    {
      id: 2,
      title: "FIR Application Format",
      category: "fir",
      description: "Complete FIR application with all required fields",
      downloads: 890,
      rating: 4.7,
      preview: "First Information Report application template with proper format and guidelines for filing complaints...",
      languages: ["English", "Hindi"]
    },
    {
      id: 3,
      title: "RTI Application Template",
      category: "rti",
      description: "Right to Information application format",
      downloads: 2100,
      rating: 4.9,
      preview: "Comprehensive RTI application template with sample questions and proper addressing format...",
      languages: ["English", "Hindi"]
    },
    {
      id: 4,
      title: "Rent Agreement Draft",
      category: "contract",
      description: "Standard rental agreement template",
      downloads: 1560,
      rating: 4.6,
      preview: "Complete rental agreement template with tenant and landlord rights, terms and conditions...",
      languages: ["English", "Hindi"]
    },
    {
      id: 5,
      title: "Consumer Complaint Format",
      category: "complaint",
      description: "Consumer court complaint application",
      downloads: 670,
      rating: 4.5,
      preview: "Consumer complaint template for defective products, poor services, and unfair trade practices...",
      languages: ["English", "Hindi"]
    },
    {
      id: 6,
      title: "Divorce Petition Template",
      category: "family",
      description: "Mutual consent divorce petition format",
      downloads: 430,
      rating: 4.4,
      preview: "Divorce petition template for mutual consent cases with all necessary legal clauses...",
      languages: ["English", "Hindi"]
    },
    {
      id: 7,
      title: "Employment Contract",
      category: "contract",
      description: "Standard employment agreement template",
      downloads: 980,
      rating: 4.7,
      preview: "Employment contract template with salary, benefits, terms of employment, and termination clauses...",
      languages: ["English", "Hindi"]
    },
    {
      id: 8,
      title: "Property Sale Agreement",
      category: "property",
      description: "Property purchase agreement template",
      downloads: 1340,
      rating: 4.8,
      preview: "Property sale agreement template with payment terms, possession details, and legal compliance...",
      languages: ["English", "Hindi"]
    }
  ];

  const categories = [
    { value: 'all', label: t.templates.categories.all },
    { value: 'notice', label: t.templates.categories.notice },
    { value: 'fir', label: t.templates.categories.fir },
    { value: 'rti', label: t.templates.categories.rti },
    { value: 'contract', label: t.templates.categories.contract },
    { value: 'complaint', label: t.templates.categories.complaint },
    { value: 'family', label: t.templates.categories.family },
    { value: 'property', label: t.templates.categories.property }
  ];

  const filteredTemplates = templates.filter(template => {
    const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
    const searchMatch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handleDownload = (templateId: number, templateTitle: string) => {
    // Simulate download
    showToast(`${templateTitle} ${t.templates.downloadSuccess}`);
  };

  const handlePreview = (template: any) => {
    alert(`Preview: ${template.title}\n\n${template.preview}`);
  };

  return (
    <section id="templates" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-black mb-4">
            {t.templates.heading}
          </h2>
          <p className="text-lg text-gray-700 font-sans max-w-2xl mx-auto">
            {t.templates.subheading}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t.templates.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg font-sans focus:outline-none focus:ring-2 focus:ring-black w-80"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 font-sans focus:outline-none focus:ring-2 focus:ring-black"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <FileText className="w-8 h-8 text-black flex-shrink-0" />
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      ⭐ {template.rating}
                    </div>
                    <div className="text-xs text-gray-500">
                      {template.downloads} {t.templates.downloads}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold font-serif text-black mb-2">
                  {template.title}
                </h3>
                
                <p className="text-sm text-gray-600 font-sans mb-4 line-clamp-2">
                  {template.description}
                </p>

                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">
                    {t.templates.availableIn}:
                  </div>
                  <div className="flex space-x-1">
                    {template.languages.map(lang => (
                      <span
                        key={lang}
                        className="px-2 py-1 bg-gray-100 text-xs rounded"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePreview(template)}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 border border-gray-300 rounded text-sm font-sans hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{t.templates.preview}</span>
                  </button>
                  
                  <button
                    onClick={() => handleDownload(template.id, template.title)}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 bg-black text-white rounded text-sm font-sans hover:scale-105 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t.templates.download}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-sans text-lg">
              {t.templates.noResults}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export { Templates };
export default Templates;