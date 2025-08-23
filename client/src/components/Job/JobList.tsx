import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import JobCard from "./JobCard";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useGetJobsQuery } from "../../features/jobs/jobsApi";

export default function JobList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);

  const { data: jobs, isLoading, error } = useGetJobsQuery();

  // Filter jobs based on search and job type
  const filteredJobs = jobs?.filter((job: any) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesJobType = selectedJobType ? job.jobType === selectedJobType : true;
    
    return matchesSearch && matchesJobType;
  }) || [];

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedJobType]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedJobType("");
    setCurrentPage(1);
  };

  const jobTypes = [
    { value: "full-time", label: "Full-time", count: jobs?.filter((j: any) => j.jobType === "full-time").length || 0 },
    { value: "part-time", label: "Part-time", count: jobs?.filter((j: any) => j.jobType === "part-time").length || 0 },
    { value: "contract", label: "Contract", count: jobs?.filter((j: any) => j.jobType === "contract").length || 0 },
    { value: "internship", label: "Internship", count: jobs?.filter((j: any) => j.jobType === "internship").length || 0 },
  ];

  if (isLoading) {
  return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">Error loading jobs</h3>
        <p className="text-zinc-600 dark:text-zinc-400">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filters Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <Input
                placeholder="Search jobs, companies, or locations..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Filters</span>
            </div>
            
            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-800 dark:text-white text-sm"
            >
              <option value="">All Job Types</option>
              {jobTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label} ({type.count})
                </option>
              ))}
            </select>
            
            {(searchTerm || selectedJobType) && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="text-sm px-3 py-2"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-zinc-600 dark:text-zinc-400">
          Showing {filteredJobs.length} of {jobs?.length || 0} jobs
        </p>
        {filteredJobs.length > 0 && (
          <p className="text-zinc-600 dark:text-zinc-400">
            Page {currentPage} of {totalPages}
          </p>
        )}
      </div>

      {/* Jobs Grid */}
      {currentJobs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentJobs.map((job: any) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">No jobs found</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            {searchTerm || selectedJobType 
              ? "Try adjusting your search criteria or filters"
              : "Check back later for new opportunities"
            }
          </p>
          {(searchTerm || selectedJobType) && (
            <Button onClick={clearFilters} className="bg-primary hover:bg-blue-700 text-white">
              Clear Filters
            </Button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center">
          <nav className="flex items-center gap-2">
            {/* Previous Button */}
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              className="px-3 py-2 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Previous
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isCurrentPage = pageNumber === currentPage;
                
                // Show first page, last page, current page, and pages around current
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      variant={isCurrentPage ? "default" : "outline"}
                      className={`px-3 py-2 text-sm min-w-[40px] ${
                        isCurrentPage 
                          ? 'bg-primary text-white' 
                          : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      {pageNumber}
                    </Button>
                  );
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return <span key={pageNumber} className="px-2 text-zinc-400">...</span>;
                }
                return null;
              })}
            </div>

            {/* Next Button */}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              className="px-3 py-2 text-sm"
            >
              Next
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
