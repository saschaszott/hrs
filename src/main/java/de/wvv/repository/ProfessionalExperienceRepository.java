package de.wvv.repository;

import de.wvv.domain.ProfessionalExperience;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProfessionalExperience entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfessionalExperienceRepository extends JpaRepository<ProfessionalExperience, Long> {
}
