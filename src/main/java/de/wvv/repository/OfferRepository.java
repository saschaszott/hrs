package de.wvv.repository;

import de.wvv.domain.Offer;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Offer entity.
 */
@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {

    @Query(value = "select distinct offer from Offer offer left join fetch offer.companies left join fetch offer.workingStyles left join fetch offer.professionalExperiences left join fetch offer.employeeStyles",
        countQuery = "select count(distinct offer) from Offer offer")
    Page<Offer> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct offer from Offer offer left join fetch offer.companies left join fetch offer.workingStyles left join fetch offer.professionalExperiences left join fetch offer.employeeStyles")
    List<Offer> findAllWithEagerRelationships();

    @Query("select offer from Offer offer left join fetch offer.companies left join fetch offer.workingStyles left join fetch offer.professionalExperiences left join fetch offer.employeeStyles where offer.id =:id")
    Optional<Offer> findOneWithEagerRelationships(@Param("id") Long id);
}
